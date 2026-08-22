# Dashboard component kit

Nuxt auto-imports every component in this directory because `nuxt.config.ts` sets `pathPrefix: false`. Use the filename directly in templates, for example `<StatCard />` or `<AttendanceRegister />`.

## Component boundaries

- `app/` contains the responsive dashboard shell and the public-site header.
- `ui/` contains feature-neutral layout, data, form, feedback, and access-control primitives.
- `dashboard/` contains school-specific components composed from the UI primitives.
- API calls, route fetching, and feature state belong in pages or composables. Components receive data through props and report intent through events.
- Shared component contracts live in `~/types/dashboard` and are re-exported from `~/types`.

## Included components

- Shell: `AppSidebar`, `AppHeader`, `PageHeader`
- Layout and metrics: `DashboardSection`, `StatCard`
- Data: `DataTable`, `TablePagination`, `SearchInput`, `FilterBar`, `StatusBadge`
- Forms and overlays: `FormField`, `BaseModal`, `ConfirmDialog`
- Feedback and states: `EmptyState`, `SkeletonLoader`, `ToastNotification`
- Access and school workflows: `PermissionGate`, `AttendanceRegister`, `TimetableGrid`, `FeeBalanceCard`

## Common examples

### Data table with a custom status cell

```vue
<DataTable :columns="columns" :rows="rows" row-key="id">
  <template #cell-status="{ value }">
    <StatusBadge :label="String(value)" />
  </template>
</DataTable>
```

Column keys support nested values such as `guardian.email`. Add `sortable: true` to a column and handle the `sort` event in the page that owns the query.

### Accessible form field

```vue
<FormField label="Nome do aluno" name="student-name" :error="errors.name" required>
  <template #default="field">
    <input
      :id="field.id"
      v-model="form.name"
      class="h-11 w-full rounded-control border border-line bg-surface-strong px-3"
      :aria-describedby="field.describedBy"
      :aria-invalid="field.invalid"
      :required="field.required"
    >
  </template>
</FormField>
```

### Toasts

`ToastNotification` is mounted once in `app.vue`. Any page or component can publish feedback through the composable:

```ts
const toast = useToast()

toast.success('Presenças guardadas', 'O registo da turma foi atualizado.')
toast.error('Não foi possível guardar', 'Tente novamente dentro de alguns instantes.')
```

### Permission gate

```vue
<PermissionGate :roles="['admin', 'teacher']">
  <button class="button button--primary">Registar presença</button>

  <template #fallback>
    <p class="text-sm text-ink-soft">Não tem permissão para alterar este registo.</p>
  </template>
</PermissionGate>
```

The gate controls presentation only. Backend routes must enforce the same authorization rules.

### Modal and confirmation

```vue
<ConfirmDialog
  v-model="confirmOpen"
  title="Remover registo?"
  description="Esta ação remove o registo selecionado."
  confirm-label="Remover"
  tone="danger"
  @confirm="removeRecord"
/>
```

`BaseModal` manages focus, Escape, backdrop dismissal, focus restoration, and reduced-motion transitions.
