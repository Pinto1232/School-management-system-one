<script setup lang="ts">
const props = withDefaults(defineProps<{
  roles?: string[]
  permissions?: string[]
  userRoles?: readonly string[]
  userPermissions?: readonly string[]
  mode?: 'any' | 'all'
  allowPlatformAdmin?: boolean
}>(), {
  roles: () => [],
  permissions: () => [],
  userRoles: undefined,
  userPermissions: () => [],
  mode: 'any',
  allowPlatformAdmin: true,
})

const { roles: authenticatedRoles } = useAuth()

const normalise = (values: readonly string[]) => values.map(value => value.trim().toLowerCase()).filter(Boolean)

const allowed = computed(() => {
  const requiredRoles = normalise(props.roles)
  const requiredPermissions = normalise(props.permissions)
  const currentRoles = normalise(props.userRoles || authenticatedRoles.value)
  const currentPermissions = normalise(props.userPermissions)

  if (props.allowPlatformAdmin && currentRoles.includes('platform_admin')) return true
  if (!requiredRoles.length && !requiredPermissions.length) return true

  const checks = [
    ...requiredRoles.map(role => currentRoles.includes(role)),
    ...requiredPermissions.map(permission => currentPermissions.includes(permission)),
  ]

  return props.mode === 'all' ? checks.every(Boolean) : checks.some(Boolean)
})
</script>

<template>
  <slot v-if="allowed" />
  <slot v-else name="fallback" />
</template>
