<script setup lang="ts">
type TeacherFormField = keyof typeof initialForm

interface StoredTeacherRecord {
  id: string
  name: string
  email: string
  phone: string
  department: string
  subjects: string[]
  workload: number
  active: boolean
  isNew: boolean
  lastActivity: string
  avatarTone: string
}

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  academicDegree: '',
  institution: '',
  graduationYear: '',
  department: '',
  workload: 0,
}

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  alias: ['/dashboard/professores/adicionar'],
})

useSeoMeta({ title: 'Adicionar Novo Professor', robots: 'noindex' })

const toast = useToast()
const form = reactive({ ...initialForm })
const errors = reactive<Partial<Record<TeacherFormField | 'photo' | 'subjects', string>>>({})
const subjects = ref<string[]>(['Biologia', 'Geologia'])
const subjectDraft = ref('')
const photoFile = ref<File | null>(null)
const photoPreview = ref('')
const formElement = ref<HTMLFormElement | null>(null)
const isSubmitting = ref(false)

const currentYear = new Date().getFullYear()
const academicDegrees = ['Licenciatura', 'Pós-graduação', 'Mestrado', 'Doutoramento']
const departments = ['Matemática', 'Ciências', 'Artes', 'Humanidades', 'Línguas', 'Tecnologia']
const subjectSuggestions = [
  'Álgebra', 'Biologia', 'Desenho', 'Filosofia', 'Física', 'Francês', 'Geografia', 'Geologia',
  'História', 'Informática', 'Inglês', 'Matemática', 'Português', 'Química', 'Robótica',
]

const clearErrors = () => {
  for (const key of Object.keys(errors) as Array<keyof typeof errors>) delete errors[key]
}

const validate = () => {
  clearErrors()
  const nameParts = form.fullName.trim().split(/\s+/).filter(Boolean)

  if (nameParts.length < 2) errors.fullName = 'Introduza o nome completo do professor.'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Introduza um email institucional válido.'
  if (!/^\+?[\d\s()-]{9,20}$/.test(form.phone.trim())) errors.phone = 'Introduza um número de telemóvel válido.'
  if (!form.academicDegree) errors.academicDegree = 'Selecione o grau académico.'
  if (!form.institution.trim()) errors.institution = 'Introduza o nome da instituição.'

  const graduationYear = Number(form.graduationYear)
  if (!Number.isInteger(graduationYear) || graduationYear < 1950 || graduationYear > currentYear) {
    errors.graduationYear = `Introduza um ano entre 1950 e ${currentYear}.`
  }

  if (!form.department) errors.department = 'Selecione o departamento.'
  if (!subjects.value.length) errors.subjects = 'Adicione pelo menos uma disciplina.'
  if (!Number.isFinite(Number(form.workload)) || Number(form.workload) < 1 || Number(form.workload) > 45) {
    errors.workload = 'Introduza uma carga horária entre 1 e 45 horas.'
  }

  return Object.keys(errors).length === 0
}

const addSubject = () => {
  const value = subjectDraft.value.trim().replace(/,$/, '')
  if (!value) return

  if (subjects.value.some(subject => subject.toLocaleLowerCase('pt-PT') === value.toLocaleLowerCase('pt-PT'))) {
    errors.subjects = 'Esta disciplina já foi adicionada.'
    return
  }

  subjects.value = [...subjects.value, value]
  subjectDraft.value = ''
  delete errors.subjects
}

const handleSubjectKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault()
    addSubject()
    return
  }

  if (event.key === 'Backspace' && !subjectDraft.value && subjects.value.length) {
    subjects.value = subjects.value.slice(0, -1)
  }
}

const removeSubject = (subject: string) => {
  subjects.value = subjects.value.filter(item => item !== subject)
}

const setPhoto = (file?: File) => {
  delete errors.photo
  if (!file) return

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    errors.photo = 'Selecione uma fotografia em formato PNG ou JPG.'
    return
  }

  if (file.size > 6 * 1024 * 1024) {
    errors.photo = 'A fotografia não pode exceder 6 MB.'
    return
  }

  if (photoPreview.value) URL.revokeObjectURL(photoPreview.value)
  photoFile.value = file
  photoPreview.value = URL.createObjectURL(file)
}

const handlePhotoInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  setPhoto(input.files?.[0])
}

const handlePhotoDrop = (event: DragEvent) => {
  setPhoto(event.dataTransfer?.files?.[0])
}

const storeTeacherLocally = () => {
  if (!import.meta.client) return

  const nameParts = form.fullName.trim().split(/\s+/)
  const record: StoredTeacherRecord = {
    id: `teacher-${Date.now()}`,
    name: form.fullName.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    department: form.department,
    subjects: [...subjects.value],
    workload: Number(form.workload),
    active: true,
    isNew: true,
    lastActivity: 'Agora',
    avatarTone: nameParts.length % 2 ? 'avatar-teal' : 'avatar-navy',
  }

  try {
    const saved = JSON.parse(localStorage.getItem('lusivo-added-teachers') || '[]')
    const records = Array.isArray(saved) ? saved : []
    localStorage.setItem('lusivo-added-teachers', JSON.stringify([record, ...records].slice(0, 100)))
  }
  catch {
    localStorage.setItem('lusivo-added-teachers', JSON.stringify([record]))
  }
}

const submit = async () => {
  if (!validate()) {
    await nextTick()
    formElement.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    return
  }

  isSubmitting.value = true
  storeTeacherLocally()
  toast.success('Professor registado', `${form.fullName.trim()} foi adicionado ao diretório de professores.`)
  await navigateTo('/dashboard/teachers')
  isSubmitting.value = false
}

const cancel = () => navigateTo('/dashboard/teachers')

onBeforeUnmount(() => {
  if (photoPreview.value) URL.revokeObjectURL(photoPreview.value)
})
</script>

<template>
  <section class="teacher-registration" aria-labelledby="teacher-registration-title">
    <nav class="teacher-registration__breadcrumbs" aria-label="Navegação estrutural">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <Icon name="ph:caret-right" size="16" aria-hidden="true" />
      <NuxtLink to="/dashboard/teachers">Professores</NuxtLink>
      <Icon name="ph:caret-right" size="16" aria-hidden="true" />
      <span aria-current="page">Adicionar Professor</span>
    </nav>

    <header class="teacher-registration__intro">
      <h1 id="teacher-registration-title">Adicionar Novo Professor</h1>
      <p>Preencha os dados para registar um novo membro do corpo docente.</p>
    </header>

    <form ref="formElement" class="teacher-form" novalidate @submit.prevent="submit">
      <section class="teacher-form-section" aria-labelledby="personal-details-title">
        <header class="teacher-form-section__header">
          <Icon name="ph:user" size="21" aria-hidden="true" />
          <h2 id="personal-details-title">Dados Pessoais</h2>
        </header>

        <div class="personal-details-grid">
          <div class="photo-field">
            <span class="photo-field__label">Carregar Fotografia</span>
            <label
              :class="['photo-dropzone', errors.photo && 'has-error']"
              for="teacher-photo"
              @dragover.prevent
              @drop.prevent="handlePhotoDrop"
            >
              <input id="teacher-photo" class="sr-only" type="file" accept="image/png,image/jpeg" @change="handlePhotoInput">
              <img v-if="photoPreview" :src="photoPreview" alt="Pré-visualização da fotografia do professor">
              <template v-else>
                <span class="photo-dropzone__icon">
                  <Icon name="ph:cloud-arrow-up" size="28" aria-hidden="true" />
                </span>
                <strong>Clique para carregar</strong>
                <small>PNG, JPG até 6 MB</small>
              </template>
            </label>
            <p v-if="errors.photo" class="field-error" role="alert">
              <Icon name="ph:warning-circle" size="15" aria-hidden="true" />
              {{ errors.photo }}
            </p>
          </div>

          <div class="personal-fields-grid">
            <FormField class="field-span-two" label="Nome Completo" name="teacher-full-name" :error="errors.fullName" required>
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.fullName"
                  class="teacher-control"
                  type="text"
                  autocomplete="name"
                  placeholder="Ex: Maria João Silva"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField label="Email Institucional" name="teacher-email" :error="errors.email" required>
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.email"
                  class="teacher-control"
                  type="email"
                  autocomplete="email"
                  placeholder="nome@escola.pt"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField label="Telemóvel" name="teacher-phone" :error="errors.phone" required>
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.phone"
                  class="teacher-control"
                  type="tel"
                  autocomplete="tel"
                  placeholder="+351 900 000 000"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>
          </div>
        </div>
      </section>

      <section class="teacher-form-section" aria-labelledby="academic-details-title">
        <header class="teacher-form-section__header">
          <Icon name="ph:student" size="21" aria-hidden="true" />
          <h2 id="academic-details-title">Formação Académica</h2>
        </header>

        <div class="academic-grid">
          <FormField label="Grau Académico" name="teacher-degree" :error="errors.academicDegree" required>
            <template #default="field">
              <select
                :id="field.id"
                v-model="form.academicDegree"
                class="teacher-control"
                :aria-describedby="field.describedBy"
                :aria-invalid="field.invalid"
                required
              >
                <option value="" disabled>Selecione o grau</option>
                <option v-for="degree in academicDegrees" :key="degree" :value="degree">{{ degree }}</option>
              </select>
            </template>
          </FormField>

          <FormField label="Instituição" name="teacher-institution" :error="errors.institution" required>
            <template #default="field">
              <input
                :id="field.id"
                v-model="form.institution"
                class="teacher-control"
                type="text"
                autocomplete="organization"
                placeholder="Nome da Universidade"
                :aria-describedby="field.describedBy"
                :aria-invalid="field.invalid"
                required
              >
            </template>
          </FormField>

          <FormField label="Ano de Conclusão" name="teacher-graduation-year" :error="errors.graduationYear" required>
            <template #default="field">
              <input
                :id="field.id"
                v-model="form.graduationYear"
                class="teacher-control"
                type="number"
                min="1950"
                :max="currentYear"
                inputmode="numeric"
                placeholder="YYYY"
                :aria-describedby="field.describedBy"
                :aria-invalid="field.invalid"
                required
              >
            </template>
          </FormField>
        </div>
      </section>

      <section class="teacher-form-section" aria-labelledby="school-assignment-title">
        <header class="teacher-form-section__header">
          <Icon name="ph:clipboard-text" size="21" aria-hidden="true" />
          <h2 id="school-assignment-title">Atribuição Escolar</h2>
        </header>

        <div class="assignment-grid">
          <FormField label="Departamento" name="teacher-department" :error="errors.department" required>
            <template #default="field">
              <select
                :id="field.id"
                v-model="form.department"
                class="teacher-control"
                :aria-describedby="field.describedBy"
                :aria-invalid="field.invalid"
                required
              >
                <option value="" disabled>Selecione</option>
                <option v-for="department in departments" :key="department" :value="department">{{ department }}</option>
              </select>
            </template>
          </FormField>

          <FormField label="Disciplinas (Múltipla Seleção)" name="teacher-subjects" :error="errors.subjects" required>
            <template #default="field">
              <div
                class="subject-picker"
                :class="field.invalid && 'has-error'"
                :aria-describedby="field.describedBy"
                :aria-invalid="field.invalid"
              >
                <span v-for="subject in subjects" :key="subject" class="subject-chip">
                  {{ subject }}
                  <button type="button" :aria-label="`Remover ${subject}`" @click="removeSubject(subject)">
                    <Icon name="ph:x" size="15" aria-hidden="true" />
                  </button>
                </span>
                <input
                  :id="field.id"
                  v-model="subjectDraft"
                  type="text"
                  list="teacher-subject-options"
                  placeholder="Adicionar..."
                  @keydown="handleSubjectKeydown"
                  @blur="addSubject"
                >
                <datalist id="teacher-subject-options">
                  <option v-for="subject in subjectSuggestions" :key="subject" :value="subject" />
                </datalist>
              </div>
            </template>
          </FormField>

          <FormField label="Carga Horária Semanal" name="teacher-workload" :error="errors.workload" required>
            <template #default="field">
              <div class="workload-control">
                <input
                  :id="field.id"
                  v-model.number="form.workload"
                  type="number"
                  min="1"
                  max="45"
                  inputmode="numeric"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
                <span>hrs</span>
              </div>
            </template>
          </FormField>
        </div>
      </section>

      <footer class="teacher-form-actions">
        <button class="teacher-form-button teacher-form-button--secondary" type="button" :disabled="isSubmitting" @click="cancel">
          Cancelar
        </button>
        <button class="teacher-form-button teacher-form-button--primary" type="submit" :disabled="isSubmitting">
          <Icon :name="isSubmitting ? 'ph:spinner-gap' : 'ph:check-circle'" size="19" aria-hidden="true" :class="isSubmitting && 'is-spinning'" />
          {{ isSubmitting ? 'A registar' : 'Registar Professor' }}
        </button>
      </footer>
    </form>
  </section>
</template>

<style scoped>
.teacher-registration {
  width: 100%;
  max-width: 68rem;
  margin: 0 auto;
  color: var(--color-ink);
}

.teacher-registration__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1.3rem;
  color: var(--color-ink-soft);
  font-size: 0.88rem;
  font-weight: 600;
}

.teacher-registration__breadcrumbs a {
  transition: color 150ms ease;
}

.teacher-registration__breadcrumbs a:hover {
  color: var(--color-brand-700);
}

.teacher-registration__breadcrumbs span {
  color: var(--color-ink);
  font-weight: 800;
}

.teacher-registration__intro h1 {
  margin: 0;
  font-family: var(--font-header);
  font-size: clamp(2rem, 3vw, 2.65rem);
  font-weight: 800;
  letter-spacing: -0.045em;
}

.teacher-registration__intro p {
  margin: 0.65rem 0 0;
  color: color-mix(in srgb, var(--color-ink) 78%, transparent);
  font-size: 1rem;
}

.teacher-form {
  margin-top: 2.3rem;
}

.teacher-form-section + .teacher-form-section {
  margin-top: 2.9rem;
}

.teacher-form-section__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid var(--color-line);
  padding-bottom: 1rem;
}

.teacher-form-section__header > svg,
.teacher-form-section__header > span {
  flex: 0 0 auto;
  color: var(--color-brand-500);
}

.teacher-form-section__header h2 {
  margin: 0;
  font-size: 1.22rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.personal-details-grid,
.academic-grid,
.assignment-grid {
  display: grid;
  gap: 1.5rem;
  padding-top: 1.65rem;
}

.personal-details-grid {
  grid-template-columns: minmax(15rem, 19rem) minmax(0, 1fr);
}

.personal-fields-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-content: start;
  gap: 1.35rem 1.5rem;
}

.field-span-two {
  grid-column: 1 / -1;
}

.academic-grid,
.assignment-grid {
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr) minmax(10rem, 0.8fr);
}

.photo-field {
  min-width: 0;
}

.photo-field__label {
  display: block;
  margin-bottom: 0.55rem;
  font-size: 0.875rem;
  font-weight: 750;
}

.photo-dropzone {
  display: grid;
  min-height: 12.4rem;
  cursor: pointer;
  place-items: center;
  align-content: center;
  gap: 0.65rem;
  overflow: hidden;
  border: 2px dashed var(--color-line-strong);
  border-radius: var(--radius-control);
  background: color-mix(in srgb, var(--color-surface-strong) 76%, transparent);
  text-align: center;
  transition: border-color 150ms ease, background-color 150ms ease;
}

.photo-dropzone:hover,
.photo-dropzone:focus-within {
  border-color: var(--color-brand-500);
  background: var(--color-brand-50);
}

.photo-dropzone.has-error {
  border-color: var(--color-danger);
}

.photo-dropzone img {
  width: 100%;
  height: 12.4rem;
  object-fit: cover;
}

.photo-dropzone__icon {
  display: grid;
  width: 3.1rem;
  height: 3.1rem;
  place-items: center;
  border-radius: 50%;
  background: var(--color-surface-muted);
  color: color-mix(in srgb, var(--color-ink-soft) 75%, transparent);
}

.photo-dropzone strong {
  color: var(--color-brand-600);
  font-size: 0.86rem;
}

.photo-dropzone small {
  color: var(--color-ink-soft);
  font-size: 0.75rem;
}

.teacher-control,
.subject-picker,
.workload-control {
  width: 100%;
  min-height: 3.25rem;
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-control);
  background: var(--color-surface-strong);
  color: var(--color-ink);
  transition: border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease;
}

.teacher-control {
  padding: 0.75rem 1rem;
  outline: none;
  font-size: 0.96rem;
  font-weight: 500;
}

select.teacher-control {
  padding-right: 2.5rem;
}

.teacher-control::placeholder,
.subject-picker input::placeholder {
  color: color-mix(in srgb, var(--color-ink-soft) 82%, transparent);
  opacity: 1;
}

.teacher-control:focus,
.subject-picker:focus-within,
.workload-control:focus-within {
  border-color: var(--color-brand-500);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand-400) 18%, transparent);
}

.teacher-control[aria-invalid='true'],
.subject-picker.has-error,
.workload-control:has(input[aria-invalid='true']) {
  border-color: var(--color-danger);
}

.subject-picker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.55rem;
}

.subject-picker input {
  min-width: 6.8rem;
  flex: 1 1 6.8rem;
  border: 0;
  background: transparent;
  padding: 0.35rem 0.25rem;
  color: var(--color-ink);
  font: inherit;
  font-size: 0.88rem;
  outline: none;
}

.subject-chip {
  display: inline-flex;
  min-height: 2rem;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  background: var(--color-surface-muted);
  padding: 0.35rem 0.45rem 0.35rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 750;
}

.subject-chip button {
  display: grid;
  width: 1.3rem;
  height: 1.3rem;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--color-ink-soft);
}

.subject-chip button:hover {
  background: color-mix(in srgb, var(--color-ink) 9%, transparent);
  color: var(--color-ink);
}

.workload-control {
  position: relative;
  display: flex;
  align-items: center;
}

.workload-control input {
  width: 100%;
  min-height: 3.1rem;
  border: 0;
  background: transparent;
  padding: 0.75rem 3.2rem 0.75rem 1rem;
  color: var(--color-ink);
  font: inherit;
  outline: none;
}

.workload-control span {
  position: absolute;
  right: 1rem;
  color: var(--color-ink-soft);
  font-size: 0.78rem;
}

.field-error {
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  margin: 0.45rem 0 0;
  color: var(--color-danger);
  font-size: 0.75rem;
  font-weight: 650;
  line-height: 1.45;
}

.teacher-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.9rem;
  margin-top: 4rem;
  border-top: 1px solid var(--color-line);
  padding-top: 1.5rem;
  padding-bottom: 1rem;
}

.teacher-form-button {
  display: inline-flex;
  min-height: 3rem;
  min-width: 9rem;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border: 1px solid transparent;
  border-radius: var(--radius-control);
  padding: 0.75rem 1.35rem;
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  transition: transform 150ms ease, border-color 150ms ease, background-color 150ms ease;
}

.teacher-form-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.teacher-form-button:active:not(:disabled) {
  transform: translateY(1px);
}

.teacher-form-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.teacher-form-button--secondary {
  border-color: var(--color-line-strong);
  background: var(--color-surface-strong);
  color: var(--color-ink);
}

.teacher-form-button--secondary:hover:not(:disabled) {
  border-color: var(--color-brand-500);
  background: var(--color-brand-50);
}

.teacher-form-button--primary {
  min-width: 13rem;
  background: var(--color-brand-600);
  color: #f7fffd;
}

.teacher-form-button--primary:hover:not(:disabled) {
  background: var(--color-brand-700);
}

.is-spinning {
  animation: teacher-spin 0.8s linear infinite;
}

@keyframes teacher-spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 63.999rem) {
  .academic-grid,
  .assignment-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .academic-grid > :last-child,
  .assignment-grid > :last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 47.999rem) {
  .teacher-registration__breadcrumbs {
    gap: 0.45rem;
    font-size: 0.8rem;
  }

  .teacher-registration__intro h1 {
    font-size: 2rem;
  }

  .personal-details-grid,
  .personal-fields-grid,
  .academic-grid,
  .assignment-grid {
    grid-template-columns: 1fr;
  }

  .field-span-two,
  .academic-grid > :last-child,
  .assignment-grid > :last-child {
    grid-column: auto;
  }

  .photo-dropzone {
    min-height: 11rem;
  }

  .photo-dropzone img {
    height: 11rem;
  }

  .teacher-form-actions {
    margin-top: 2.5rem;
  }
}

@media (max-width: 30rem) {
  .teacher-form-actions {
    flex-direction: column-reverse;
  }

  .teacher-form-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .teacher-registration__breadcrumbs a,
  .photo-dropzone,
  .teacher-control,
  .subject-picker,
  .workload-control,
  .teacher-form-button {
    transition: none;
  }

  .is-spinning {
    animation: none;
  }
}
</style>
