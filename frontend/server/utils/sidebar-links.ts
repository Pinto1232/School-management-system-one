import type { SidebarNavigationLink, SidebarNavigationResponse } from '~~/app/types/dashboard'

type UnknownRecord = Record<string, unknown>

const MAX_SIDEBAR_LINKS = 100

const isRecord = (value: unknown): value is UnknownRecord => (
  typeof value === 'object' && value !== null && !Array.isArray(value)
)

const invalidResponse = (detail: string): never => {
  console.error('[sidebar-links] Invalid navigation API response:', detail)

  throw createError({
    statusCode: 502,
    statusMessage: 'The navigation service returned an invalid response.',
  })
}

const isDashboardPath = (path: string) => (
  (path === '/dashboard' || path.startsWith('/dashboard/'))
  && path.length <= 256
  && !path.includes('\\')
  && !path.includes('//')
  && !path.includes('?')
  && !path.includes('#')
  && !path.split('/').includes('..')
  && !/[\u0000-\u001f]/.test(path)
)

const parseLink = (value: unknown, index: number): SidebarNavigationLink => {
  if (!isRecord(value)) return invalidResponse(`Sidebar item ${index} must be an object.`)

  const { id, key, label, path, icon, roles, parent_id: parentId, position, enabled, target } = value

  if (!Number.isInteger(id) || (id as number) < 1) invalidResponse(`Sidebar item ${index} has an invalid id.`)
  if (typeof key !== 'string' || !/^[a-z0-9-]{1,64}$/i.test(key.trim())) invalidResponse(`Sidebar item ${index} has an invalid key.`)
  if (typeof label !== 'string' || !label.trim() || label.trim().length > 120 || /[\u0000-\u001f]/.test(label)) invalidResponse(`Sidebar item ${index} has an invalid label.`)
  if (typeof path !== 'string' || !isDashboardPath(path)) invalidResponse(`Sidebar item ${index} has an unsafe path.`)
  if (typeof icon !== 'string' || icon.length > 80 || !/^[a-z0-9-]+:[a-z0-9-]+$/i.test(icon)) invalidResponse(`Sidebar item ${index} has an invalid icon.`)
  if (
    !Array.isArray(roles)
    || roles.length > 20
    || !roles.every(role => typeof role === 'string' && /^[a-z0-9_-]{1,64}$/i.test(role.trim()))
  ) return invalidResponse(`Sidebar item ${index} has invalid roles.`)
  if (parentId !== null && (!Number.isInteger(parentId) || (parentId as number) < 1)) invalidResponse(`Sidebar item ${index} has an invalid parent id.`)
  if (!Number.isInteger(position) || (position as number) < 0) invalidResponse(`Sidebar item ${index} has an invalid position.`)
  if (typeof enabled !== 'boolean') invalidResponse(`Sidebar item ${index} has an invalid enabled value.`)
  if (target !== '_self' && target !== '_blank') invalidResponse(`Sidebar item ${index} has an invalid target.`)

  return {
    id: id as number,
    key: (key as string).trim(),
    label: (label as string).trim(),
    path: path as string,
    icon: (icon as string).toLowerCase(),
    roles: (roles as string[]).map(role => role.trim().toLowerCase()),
    parent_id: parentId as number | null,
    position: position as number,
    enabled: enabled as boolean,
    target: target as '_self' | '_blank',
  }
}

export const parseSidebarNavigationResponse = (value: unknown): SidebarNavigationResponse => {
  if (!isRecord(value)) return invalidResponse('The sidebar response must be an object.')
  if (!Array.isArray(value.data)) return invalidResponse('The sidebar response must contain a data array.')
  if (value.data.length > MAX_SIDEBAR_LINKS) return invalidResponse(`The sidebar response exceeds ${MAX_SIDEBAR_LINKS} items.`)

  const data: SidebarNavigationLink[] = value.data.map(parseLink)
  const ids = new Set<number>()
  const keys = new Set<string>()
  const paths = new Set<string>()

  for (const link of data) {
    if (ids.has(link.id)) invalidResponse(`Sidebar item id ${link.id} is duplicated.`)
    if (keys.has(link.key)) invalidResponse(`Sidebar item key ${link.key} is duplicated.`)
    if (paths.has(link.path)) invalidResponse(`Sidebar item path ${link.path} is duplicated.`)

    ids.add(link.id)
    keys.add(link.key)
    paths.add(link.path)
  }

  if (!isRecord(value.meta)) return invalidResponse('The sidebar response must contain metadata.')

  const { total, role, tree, include_disabled: includeDisabled } = value.meta
  if (!Number.isInteger(total) || total !== data.length) invalidResponse('The sidebar response has an invalid total.')
  if (role !== null && (typeof role !== 'string' || !/^[a-z0-9_-]{1,64}$/i.test(role))) invalidResponse('The sidebar response has an invalid role.')
  if (typeof tree !== 'boolean') invalidResponse('The sidebar response has an invalid tree value.')
  if (typeof includeDisabled !== 'boolean') invalidResponse('The sidebar response has an invalid include_disabled value.')

  return {
    data,
    meta: {
      total: total as number,
      role: role as string | null,
      tree: tree as boolean,
      include_disabled: includeDisabled as boolean,
    },
  }
}
