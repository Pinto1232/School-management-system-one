<script setup lang="ts">
import receiptLogoUrl from '~/assets/logo-transparent.png'
import { createEnrollmentReceiptPdf, loadEnrollmentReceiptLogo } from '~/utils/createEnrollmentReceiptPdf'

type EnrollmentField = keyof typeof initialForm

const initialForm = {
  fullName: '',
  birthDate: '',
  gender: '',
  nationality: '',
  documentId: '',
  email: '',
  phone: '',
  address: '',
  emergencyName: '',
  emergencyRelation: '',
  emergencyPhone: '',
  academicYear: '2026/2027',
  educationLevel: '',
  grade: '',
  className: '',
  enrollmentDate: '',
  previousSchool: '',
  notes: '',
  identityDocument: null as File | null,
  proofOfAddress: null as File | null,
  academicRecord: null as File | null,
}

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  alias: ['/dashboard/alunos'],
})
useSeoMeta({ title: 'Nova Matrícula', robots: 'noindex' })

const toast = useToast()
const currentStep = ref(1)
const confirmationAccepted = ref(false)
const enrollmentCompleted = ref(false)
const form = reactive({ ...initialForm })
const errors = reactive<Partial<Record<EnrollmentField, string>>>({})
let receiptLogoPromise: ReturnType<typeof loadEnrollmentReceiptLogo> | undefined

const finalSteps = [
  { number: 1, label: 'Pessoal' },
  { number: 2, label: 'Académico' },
  { number: 3, label: 'Documentos' },
  { number: 4, label: 'Confirmação' },
]

const registrationNumber = '202601458'
const formattedBirthDate = computed(() => {
  const [year, month, day] = form.birthDate.split('-')
  return year && month && day ? `${day}/${month}/${year}` : displayValue(form.birthDate)
})
const allocatedClass = computed(() => {
  const grade = form.grade || '7.º Ano'
  const className = form.className || 'B'
  return `${grade} - Turma ${className}`
})
const academicPlacement = computed(() => {
  const grade = form.grade || '8.º Ano'
  const level = form.educationLevel || 'Ensino Fundamental'
  return `${grade} - ${level}`
})

const steps = [
  { number: 1, label: 'Dados Pessoais' },
  { number: 2, label: 'Académico' },
  { number: 3, label: 'Documentação' },
  { number: 4, label: 'Confirmação' },
]

const requiredFields: Record<number, Array<{ key: EnrollmentField, label: string }>> = {
  1: [
    { key: 'fullName', label: 'nome completo' },
    { key: 'birthDate', label: 'data de nascimento' },
    { key: 'gender', label: 'género' },
    { key: 'nationality', label: 'nacionalidade' },
    { key: 'documentId', label: 'documento de identificação' },
    { key: 'email', label: 'email' },
    { key: 'phone', label: 'telefone' },
    { key: 'address', label: 'morada completa' },
    { key: 'emergencyName', label: 'nome do contacto de emergência' },
    { key: 'emergencyRelation', label: 'grau de parentesco' },
    { key: 'emergencyPhone', label: 'telefone de emergência' },
  ],
  2: [
    { key: 'academicYear', label: 'ano letivo' },
    { key: 'educationLevel', label: 'nível de ensino' },
    { key: 'grade', label: 'ano de escolaridade' },
    { key: 'enrollmentDate', label: 'data de entrada' },
  ],
  3: [],
  4: [],
}

const clearErrors = () => {
  for (const key of Object.keys(errors) as EnrollmentField[]) delete errors[key]
}

const validateStep = () => {
  clearErrors()

  for (const field of requiredFields[currentStep.value] || []) {
    const value = form[field.key]
    if (typeof value === 'string' && !value.trim()) {
      errors[field.key] = `Introduza ${field.label}.`
    }
  }

  if (currentStep.value === 1 && form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Introduza um endereço de email válido.'
  }

  return Object.keys(errors).length === 0
}

const goToStep = (step: number) => {
  if (step >= currentStep.value) return
  clearErrors()
  currentStep.value = step
}

const handlePrimaryAction = () => {
  if (currentStep.value < 4) {
    if (!validateStep()) return
    currentStep.value += 1
    return
  }

  toast.success('Matrícula preparada', 'Os dados do novo aluno foram validados com sucesso.')
}

const handlePrevious = () => {
  if (currentStep.value <= 1) return
  clearErrors()
  currentStep.value -= 1
}

const handleCancel = () => navigateTo('/dashboard')

const handleFinalize = () => {
  if (!confirmationAccepted.value) {
    toast.warning('Confirmação necessária', 'Confirme que os dados preenchidos são verdadeiros antes de finalizar.')
    return
  }

  enrollmentCompleted.value = true
}

const downloadReceipt = async () => {
  if (!import.meta.client) return

  let receiptLogo: Awaited<ReturnType<typeof loadEnrollmentReceiptLogo>>
  try {
    receiptLogoPromise ||= loadEnrollmentReceiptLogo(receiptLogoUrl)
    receiptLogo = await receiptLogoPromise
  } catch {
    receiptLogoPromise = undefined
    toast.error('Não foi possível baixar o comprovativo', 'O logótipo da escola não pôde ser preparado. Tente novamente.')
    return
  }

  const receipt = createEnrollmentReceiptPdf({
    studentName: displayValue(form.fullName),
    registrationNumber,
    allocatedClass: allocatedClass.value,
    academicYear: displayValue(form.academicYear),
    issuedOn: new Intl.DateTimeFormat('pt-PT').format(new Date()),
  }, receiptLogo)
  const url = URL.createObjectURL(receipt)
  const link = document.createElement('a')
  link.href = url
  link.download = `comprovativo-matricula-${registrationNumber}.pdf`
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

const handleFile = (field: 'identityDocument' | 'proofOfAddress' | 'academicRecord', event: Event) => {
  const input = event.target as HTMLInputElement
  form[field] = input.files?.[0] || null
}

const displayValue = (value: string) => value.trim() || 'Não indicado'
</script>

<template>
  <section v-if="currentStep < 4" class="student-enrollment" aria-label="Matrícula de aluno">
    <nav class="student-enrollment__breadcrumbs" aria-label="Navegação estrutural">
      <NuxtLink to="/dashboard/students">Alunos</NuxtLink>
      <Icon name="ph:caret-right" size="16" aria-hidden="true" />
      <span aria-current="page">Matricular Aluno</span>
    </nav>

    <div class="student-enrollment__stepper-scroll">
      <ol class="enrollment-stepper" aria-label="Etapas da matrícula">
        <li
          v-for="step in steps"
          :key="step.number"
          :class="[
            'enrollment-step',
            {
              'is-active': currentStep === step.number,
              'is-complete': currentStep > step.number,
            },
          ]"
        >
          <button
            class="enrollment-step__button"
            type="button"
            :disabled="step.number >= currentStep"
            :aria-current="currentStep === step.number ? 'step' : undefined"
            :aria-label="`${step.label}, etapa ${step.number} de ${steps.length}`"
            @click="goToStep(step.number)"
          >
            <span class="enrollment-step__number">{{ step.number }}</span>
            <span class="enrollment-step__label">{{ step.label }}</span>
          </button>
        </li>
      </ol>
    </div>

    <form class="enrollment-card" novalidate @submit.prevent="handlePrimaryAction">
      <template v-if="currentStep === 1">
        <section class="enrollment-form-section" aria-labelledby="base-information-title">
          <header class="enrollment-form-section__header">
            <h3 id="base-information-title">Informação Base</h3>
          </header>

          <div class="enrollment-form-grid enrollment-form-grid--two">
            <FormField label="Nome Completo" name="student-full-name" :error="errors.fullName">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.fullName"
                  class="enrollment-control"
                  type="text"
                  autocomplete="name"
                  placeholder="Nome completo do aluno"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField label="Data de Nascimento" name="student-birth-date" :error="errors.birthDate">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.birthDate"
                  class="enrollment-control"
                  type="date"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField label="Género" name="student-gender" :error="errors.gender">
              <template #default="field">
                <select
                  :id="field.id"
                  v-model="form.gender"
                  class="enrollment-control"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
                  <option value="" disabled>Selecione...</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Outro">Outro</option>
                  <option value="Prefere não indicar">Prefere não indicar</option>
                </select>
              </template>
            </FormField>

            <FormField label="Nacionalidade" name="student-nationality" :error="errors.nationality">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.nationality"
                  class="enrollment-control"
                  type="text"
                  autocomplete="country-name"
                  placeholder="Ex: Portuguesa"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField class="enrollment-form-grid__full" label="Nº Cartão de Cidadão / Passaporte" name="student-document-id" :error="errors.documentId">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.documentId"
                  class="enrollment-control"
                  type="text"
                  autocomplete="off"
                  placeholder="Documento de identificação"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>
          </div>
        </section>

        <section class="enrollment-form-section" aria-labelledby="contacts-title">
          <header class="enrollment-form-section__header">
            <h3 id="contacts-title">Contactos</h3>
          </header>

          <div class="enrollment-form-grid enrollment-form-grid--two">
            <FormField label="Email" name="student-email" :error="errors.email">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.email"
                  class="enrollment-control"
                  type="email"
                  autocomplete="email"
                  placeholder="email@exemplo.com"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField label="Telefone" name="student-phone" :error="errors.phone">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.phone"
                  class="enrollment-control"
                  type="tel"
                  autocomplete="tel"
                  placeholder="+351 900 000 000"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField class="enrollment-form-grid__full" label="Morada Completa" name="student-address" :error="errors.address">
              <template #default="field">
                <textarea
                  :id="field.id"
                  v-model="form.address"
                  class="enrollment-control enrollment-control--textarea"
                  autocomplete="street-address"
                  placeholder="Insira a morada completa"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                />
              </template>
            </FormField>
          </div>
        </section>

        <section class="enrollment-form-section" aria-labelledby="emergency-contact-title">
          <header class="enrollment-form-section__header">
            <h3 id="emergency-contact-title">Contacto de Emergência</h3>
          </header>

          <div class="enrollment-form-grid enrollment-form-grid--three">
            <FormField label="Nome do Contacto" name="student-emergency-name" :error="errors.emergencyName">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.emergencyName"
                  class="enrollment-control"
                  type="text"
                  autocomplete="name"
                  placeholder="Nome"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField label="Grau de Parentesco" name="student-emergency-relation" :error="errors.emergencyRelation">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.emergencyRelation"
                  class="enrollment-control"
                  type="text"
                  placeholder="Ex: Pai, Mãe"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField label="Telefone" name="student-emergency-phone" :error="errors.emergencyPhone">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.emergencyPhone"
                  class="enrollment-control"
                  type="tel"
                  autocomplete="tel"
                  placeholder="+351..."
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>
          </div>
        </section>
      </template>

      <template v-else-if="currentStep === 2">
        <section class="enrollment-form-section" aria-labelledby="academic-information-title">
          <header class="enrollment-form-section__header">
            <h3 id="academic-information-title">Informação Académica</h3>
          </header>

          <div class="enrollment-form-grid enrollment-form-grid--two">
            <FormField label="Ano Letivo" name="student-academic-year" :error="errors.academicYear">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.academicYear"
                  class="enrollment-control"
                  type="text"
                  placeholder="2026/2027"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField label="Nível de Ensino" name="student-education-level" :error="errors.educationLevel">
              <template #default="field">
                <select
                  :id="field.id"
                  v-model="form.educationLevel"
                  class="enrollment-control"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
                  <option value="" disabled>Selecione...</option>
                  <option value="Pré-escolar">Pré-escolar</option>
                  <option value="Ensino Básico">Ensino Básico</option>
                  <option value="Ensino Secundário">Ensino Secundário</option>
                </select>
              </template>
            </FormField>

            <FormField label="Ano de Escolaridade" name="student-grade" :error="errors.grade">
              <template #default="field">
                <select
                  :id="field.id"
                  v-model="form.grade"
                  class="enrollment-control"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
                  <option value="" disabled>Selecione...</option>
                  <option v-for="year in 12" :key="year" :value="`${year}.º ano`">{{ year }}.º ano</option>
                </select>
              </template>
            </FormField>

            <FormField label="Turma" name="student-class-name">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.className"
                  class="enrollment-control"
                  type="text"
                  placeholder="Ex: A"
                  :aria-describedby="field.describedBy"
                >
              </template>
            </FormField>

            <FormField label="Data de Entrada" name="student-enrollment-date" :error="errors.enrollmentDate">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.enrollmentDate"
                  class="enrollment-control"
                  type="date"
                  :aria-describedby="field.describedBy"
                  :aria-invalid="field.invalid"
                  required
                >
              </template>
            </FormField>

            <FormField label="Escola Anterior" name="student-previous-school">
              <template #default="field">
                <input
                  :id="field.id"
                  v-model="form.previousSchool"
                  class="enrollment-control"
                  type="text"
                  placeholder="Nome da escola anterior"
                  :aria-describedby="field.describedBy"
                >
              </template>
            </FormField>

            <FormField class="enrollment-form-grid__full" label="Observações" name="student-academic-notes">
              <template #default="field">
                <textarea
                  :id="field.id"
                  v-model="form.notes"
                  class="enrollment-control enrollment-control--textarea"
                  placeholder="Informação académica adicional"
                  :aria-describedby="field.describedBy"
                />
              </template>
            </FormField>
          </div>
        </section>
      </template>

      <template v-else-if="currentStep === 3">
        <section class="enrollment-form-section" aria-labelledby="documentation-title">
          <header class="enrollment-form-section__header">
            <h3 id="documentation-title">Documentação</h3>
            <p>Adicione os documentos disponíveis. Pode concluir os anexos mais tarde.</p>
          </header>

          <div class="enrollment-form-grid enrollment-form-grid--two">
            <FormField label="Documento de Identificação" name="student-identity-document" hint="PDF, JPG ou PNG até 10 MB.">
              <template #default="field">
                <input
                  :id="field.id"
                  class="enrollment-control enrollment-control--file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  :aria-describedby="field.describedBy"
                  @change="handleFile('identityDocument', $event)"
                >
              </template>
            </FormField>

            <FormField label="Comprovativo de Morada" name="student-address-proof" hint="PDF, JPG ou PNG até 10 MB.">
              <template #default="field">
                <input
                  :id="field.id"
                  class="enrollment-control enrollment-control--file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  :aria-describedby="field.describedBy"
                  @change="handleFile('proofOfAddress', $event)"
                >
              </template>
            </FormField>

            <FormField class="enrollment-form-grid__full" label="Certificado ou Registo Académico" name="student-academic-record" hint="PDF, JPG ou PNG até 10 MB.">
              <template #default="field">
                <input
                  :id="field.id"
                  class="enrollment-control enrollment-control--file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  :aria-describedby="field.describedBy"
                  @change="handleFile('academicRecord', $event)"
                >
              </template>
            </FormField>
          </div>
        </section>
      </template>

      <footer class="enrollment-card__footer">
        <button class="button button--ghost" type="button" @click="handleCancel">
          Cancelar
        </button>
        <button v-if="currentStep > 1" class="button button--secondary" type="button" @click="handlePrevious">
          <Icon name="ph:arrow-left" size="17" aria-hidden="true" />
          Anterior
        </button>
        <button class="button button--primary enrollment-primary-action" type="submit">
          {{ currentStep === 4 ? 'Concluir' : 'Próximo' }}
          <Icon :name="currentStep === 4 ? 'ph:check' : 'ph:arrow-right'" size="17" aria-hidden="true" />
        </button>
      </footer>
    </form>
  </section>

  <Teleport to="body">
    <div v-if="currentStep === 4" class="enrollment-final-shell">
      <template v-if="!enrollmentCompleted">
        <header class="enrollment-final-header">
          <div class="enrollment-final-header__brand" aria-label="Lusivo">
            <Icon name="ph:graduation-cap-fill" size="38" aria-hidden="true" />
            <span>Lusivo</span>
          </div>
          <button class="enrollment-final-header__exit" type="button" @click="handleCancel">
            <Icon name="ph:x" size="23" aria-hidden="true" />
            <span>Sair</span>
          </button>
        </header>

        <main class="enrollment-review" aria-labelledby="enrollment-review-title">
          <ol class="enrollment-review__stepper" aria-label="Progresso da matrícula">
            <li v-for="step in finalSteps" :key="step.number" :class="{ 'is-current': step.number === 4 }">
              <span class="enrollment-review__step-number">
                <Icon v-if="step.number < 4" name="ph:check" size="17" aria-hidden="true" />
                <span v-else>{{ step.number }}</span>
              </span>
              <span>{{ step.label }}</span>
            </li>
          </ol>

          <section class="enrollment-review__content">
            <header class="enrollment-review__intro">
              <h1 id="enrollment-review-title">Revisão e Confirmação</h1>
              <p>Por favor, revise as informações abaixo antes de finalizar a matrícula do aluno.</p>
            </header>

            <div class="enrollment-review__summary-grid">
              <section class="review-summary-card" aria-labelledby="review-personal-title">
                <h2 id="review-personal-title">
                  <Icon name="ph:user" size="22" aria-hidden="true" />
                  Dados Pessoais
                </h2>
                <dl class="review-summary-card__details">
                  <div><dt>Nome Completo</dt><dd>{{ displayValue(form.fullName) }}</dd></div>
                  <div><dt>Data de Nascimento</dt><dd>{{ formattedBirthDate }}</dd></div>
                  <div><dt>CPF</dt><dd>{{ displayValue(form.documentId) }}</dd></div>
                  <div><dt>Responsável</dt><dd>{{ displayValue(form.emergencyName) }}</dd></div>
                </dl>
              </section>

              <section class="review-summary-card" aria-labelledby="review-academic-title">
                <h2 id="review-academic-title">
                  <Icon name="ph:student" size="22" aria-hidden="true" />
                  Dados Académicos
                </h2>
                <dl class="review-summary-card__details">
                  <div><dt>Ano Letivo</dt><dd>{{ displayValue(form.academicYear) }}</dd></div>
                  <div><dt>Série/Ano</dt><dd>{{ academicPlacement }}</dd></div>
                  <div><dt>Turno</dt><dd>Matutino</dd></div>
                  <div><dt>Turma (Desejada)</dt><dd>{{ form.className ? `Turma ${form.className}` : 'Turma A' }}</dd></div>
                </dl>
              </section>

              <section class="review-summary-card review-summary-card--documents" aria-labelledby="review-documents-title">
                <h2 id="review-documents-title">
                  <Icon name="ph:file-text" size="22" aria-hidden="true" />
                  Documentação Anexada
                </h2>
                <ul class="review-document-list" aria-label="Documentos anexados">
                  <li><Icon name="ph:check-circle-fill" size="15" aria-hidden="true" />Certidão de Nascimento</li>
                  <li><Icon name="ph:check-circle-fill" size="15" aria-hidden="true" />Comprovante de Residência</li>
                  <li><Icon name="ph:check-circle-fill" size="15" aria-hidden="true" />Histórico Escolar</li>
                </ul>
              </section>
            </div>

            <label class="enrollment-truth-confirmation">
              <input v-model="confirmationAccepted" type="checkbox">
              <span class="enrollment-truth-confirmation__copy">
                <strong>Confirmação de Veracidade</strong>
                <span>Declaro que as informações preenchidas são verdadeiras e estou ciente de que deverei apresentar os documentos originais na secretaria da escola.</span>
              </span>
            </label>

            <footer class="enrollment-review__footer">
              <button class="enrollment-review__back" type="button" @click="handlePrevious">Anterior</button>
              <button class="enrollment-review__finish" type="button" @click="handleFinalize">
                <Icon name="ph:check-circle" size="17" aria-hidden="true" />
                Finalizar Matrícula
              </button>
            </footer>
          </section>
        </main>
      </template>

      <main v-else class="enrollment-success" aria-labelledby="enrollment-success-title">
        <div class="enrollment-success__icon" aria-hidden="true">
          <span>
            <span class="enrollment-success__check"><Icon name="ph:check" size="27" /></span>
          </span>
        </div>
        <h1 id="enrollment-success-title">Matrícula Realizada com Sucesso!</h1>
        <p>O processo de inscrição do estudante <strong>{{ displayValue(form.fullName) }}</strong> foi concluído e registado no sistema.</p>

        <dl class="enrollment-success__details">
          <div><dt>N.º de Matrícula</dt><dd>{{ registrationNumber }}</dd></div>
          <div><dt>Turma Alocada</dt><dd>{{ allocatedClass }}</dd></div>
          <div><dt>Ano Letivo</dt><dd>{{ displayValue(form.academicYear) }}</dd></div>
        </dl>

        <div class="enrollment-success__actions">
          <button class="enrollment-success__download" type="button" @click="downloadReceipt">
            <Icon name="ph:download-simple" size="19" aria-hidden="true" />
            Baixar Comprovativo
          </button>
          <button class="enrollment-success__dashboard" type="button" @click="handleCancel">
            <Icon name="ph:arrow-left" size="20" aria-hidden="true" />
            Voltar ao Dashboard
          </button>
        </div>
      </main>
    </div>
  </Teleport>
</template>

<style scoped>
.student-enrollment {
  min-width: 0;
  color: var(--color-ink);
}

.student-enrollment__breadcrumbs {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-ink-soft);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
}

.student-enrollment__breadcrumbs a {
  transition: color 150ms ease;
}

.student-enrollment__breadcrumbs a:hover {
  color: var(--color-brand-700);
}

.student-enrollment__breadcrumbs span {
  color: var(--color-ink);
  font-weight: 650;
}

.student-enrollment__stepper-scroll {
  margin-top: 34px;
  overflow-x: auto;
  padding: 0 8px 4px;
  scrollbar-width: thin;
}

.enrollment-stepper {
  display: grid;
  min-width: 620px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.enrollment-step {
  position: relative;
  min-width: 0;
}

.enrollment-step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 16px;
  right: calc(-50% + 45px);
  left: calc(50% + 45px);
  height: 2px;
  background: var(--color-line);
}

.enrollment-step.is-complete:not(:last-child)::after {
  background: var(--color-brand-500);
}

.enrollment-step__button {
  position: relative;
  z-index: 1;
  display: grid;
  width: 100%;
  justify-items: center;
  gap: 9px;
  border: 0;
  background: transparent;
  color: var(--color-ink-soft);
}

.enrollment-step__button:disabled {
  cursor: default;
}

.enrollment-step__number {
  display: grid;
  width: 33px;
  height: 33px;
  place-items: center;
  border-radius: 999px;
  background: var(--color-surface-muted);
  color: var(--color-ink-soft);
  font-size: 16px;
  font-weight: 750;
  line-height: 1;
}

.enrollment-step.is-active .enrollment-step__number,
.enrollment-step.is-complete .enrollment-step__number {
  background: var(--color-brand-500);
  color: #071a3d;
}

.enrollment-step__label {
  color: currentColor;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.035em;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
}

.enrollment-step.is-active .enrollment-step__label,
.enrollment-step.is-complete .enrollment-step__label {
  color: var(--color-nav-accent);
}

.enrollment-step.is-complete .enrollment-step__button:not(:disabled):hover .enrollment-step__label {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.enrollment-card {
  margin-top: 29px;
  padding: 27px 25px 21px;
  border: 1px solid var(--color-line);
  border-radius: 10px;
  background: var(--color-surface-strong);
  box-shadow: var(--shadow-panel-soft);
}

.enrollment-form-section + .enrollment-form-section {
  margin-top: 31px;
}

.enrollment-form-section__header {
  margin-bottom: 25px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--color-line);
}

.enrollment-form-section__header h3 {
  margin: 0;
  color: var(--color-ink);
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.025em;
}

.enrollment-form-section__header p {
  margin: 7px 0 0;
  color: var(--color-ink-soft);
  font-size: 14px;
  line-height: 1.5;
}

.enrollment-form-grid {
  display: grid;
  gap: 24px;
}

.enrollment-form-grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.enrollment-form-grid--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.enrollment-form-grid__full {
  grid-column: 1 / -1;
}

.enrollment-control {
  width: 100%;
  min-height: 46px;
  border: 1px solid var(--color-line-strong);
  border-radius: 0;
  background: var(--color-surface-strong);
  padding: 10px 13px;
  color: var(--color-ink);
  font-size: 16px;
  line-height: 1.35;
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease;
}

.enrollment-control::placeholder {
  color: color-mix(in srgb, var(--color-ink-soft) 86%, transparent);
  opacity: 1;
}

.enrollment-control:hover {
  border-color: var(--color-brand-400);
}

.enrollment-control:focus-visible {
  border-color: var(--color-brand-600);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand-400) 24%, transparent);
}

.enrollment-control[aria-invalid='true'] {
  border-color: var(--color-danger);
}

.enrollment-control--textarea {
  min-height: 90px;
  resize: vertical;
}

.enrollment-control--file {
  padding: 7px 9px;
  color: var(--color-ink-soft);
}

.enrollment-control--file::file-selector-button {
  min-height: 30px;
  margin-right: 10px;
  border: 1px solid var(--color-line);
  border-radius: 6px;
  background: var(--color-surface-muted);
  padding: 5px 10px;
  color: var(--color-ink);
  font-weight: 700;
  cursor: pointer;
}

.enrollment-summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.enrollment-summary {
  min-width: 0;
  border: 1px solid var(--color-line);
  background: var(--color-surface);
  padding: 18px;
}

.enrollment-summary h4 {
  margin: 0 0 15px;
  color: var(--color-ink);
  font-size: 16px;
  font-weight: 750;
}

.enrollment-summary dl {
  display: grid;
  gap: 11px;
  margin: 0;
}

.enrollment-summary dl div {
  display: grid;
  grid-template-columns: minmax(110px, 0.42fr) minmax(0, 1fr);
  gap: 12px;
}

.enrollment-summary dt,
.enrollment-summary dd {
  margin: 0;
  overflow-wrap: anywhere;
  font-size: 13px;
  line-height: 1.4;
}

.enrollment-summary dt {
  color: var(--color-ink-soft);
}

.enrollment-summary dd {
  color: var(--color-ink);
  font-weight: 650;
}

.enrollment-card__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 17px;
  padding-top: 23px;
  border-top: 1px solid var(--color-line);
}

.enrollment-primary-action {
  min-width: 128px;
}

.enrollment-final-shell {
  position: fixed;
  z-index: 1000;
  inset: 0;
  min-width: 320px;
  min-height: 100dvh;
  overflow-y: auto;
  background: var(--color-canvas);
  padding: 28px 32px 44px;
  color: var(--color-ink);
}

.enrollment-final-header {
  display: flex;
  width: 100%;
  max-width: 884px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.enrollment-final-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--color-ink);
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.035em;
}

.enrollment-final-header__brand > span:first-child {
  color: var(--color-brand-500);
}

.enrollment-final-header__exit {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 0;
  background: transparent;
  padding: 8px;
  color: var(--color-ink-soft);
  font-size: 14px;
  transition: color 150ms ease;
}

.enrollment-final-header__exit:hover {
  color: var(--color-ink);
}

.enrollment-review {
  width: 100%;
  max-width: 884px;
  margin: 26px auto 0;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  background: var(--color-surface-strong);
  padding: 39px 40px 38px;
  box-shadow: 0 2px 5px color-mix(in srgb, var(--color-ink) 6%, transparent);
}

.enrollment-review__stepper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0;
  padding: 0 30px 0 14px;
  list-style: none;
}

.enrollment-review__stepper li {
  display: grid;
  justify-items: center;
  gap: 8px;
  color: var(--color-ink);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}

.enrollment-review__step-number {
  display: grid;
  width: 33px;
  height: 33px;
  place-items: center;
  border-radius: 999px;
  background: var(--color-brand-500);
  color: #063c48;
  font-size: 15px;
  font-weight: 750;
}

.enrollment-review__content {
  margin-top: 33px;
}

.enrollment-review__intro h1 {
  margin: 0;
  color: var(--color-ink);
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.enrollment-review__intro p {
  margin: 11px 0 0;
  color: var(--color-ink-soft);
  font-size: 15px;
  line-height: 1.55;
}

.enrollment-review__summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 30px;
}

.review-summary-card {
  min-width: 0;
  border: 1px solid var(--color-line);
  background: var(--color-surface-muted);
  padding: 17px 16px 20px;
}

.review-summary-card h2 {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--color-brand-700) 24%, var(--color-line));
  padding: 0 2px 11px;
  color: var(--color-ink);
  font-size: 14px;
  font-weight: 750;
  line-height: 1.2;
}

.review-summary-card h2 > span:first-child {
  flex: 0 0 auto;
  color: var(--color-brand-700);
}

.review-summary-card__details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 17px 26px;
  margin: 17px 0 0;
}

.review-summary-card__details div {
  min-width: 0;
}

.review-summary-card__details dt,
.review-summary-card__details dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.review-summary-card__details dt {
  color: color-mix(in srgb, var(--color-ink-soft) 88%, var(--color-navy-500));
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.08em;
  line-height: 1.3;
  text-transform: uppercase;
}

.review-summary-card__details dd {
  margin-top: 7px;
  color: var(--color-ink);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.55;
}

.review-summary-card--documents {
  grid-column: 1 / -1;
  padding-bottom: 17px;
}

.review-document-list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.review-document-list li {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  gap: 9px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: var(--color-surface-strong);
  padding: 7px 14px;
  color: var(--color-ink);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
}

.review-document-list li > span:first-child {
  color: var(--color-brand-500);
}

.enrollment-truth-confirmation {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  margin-top: 30px;
  border-left: 4px solid var(--color-brand-500);
  background: var(--color-surface);
  padding: 17px 16px;
  cursor: pointer;
}

.enrollment-truth-confirmation input {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  margin: 0;
  accent-color: var(--color-brand-600);
}

.enrollment-truth-confirmation__copy {
  display: grid;
  gap: 5px;
  color: var(--color-ink-soft);
  font-size: 13px;
  line-height: 1.5;
}

.enrollment-truth-confirmation__copy strong {
  color: var(--color-ink);
  font-size: 15px;
  font-weight: 700;
}

.enrollment-review__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 31px;
  border-top: 1px solid var(--color-line);
  padding: 17px 0 0;
}

.enrollment-review__back,
.enrollment-review__finish {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  padding: 10px 25px;
  font-size: 14px;
  font-weight: 650;
  transition: background-color 150ms ease, border-color 150ms ease, transform 150ms ease;
}

.enrollment-review__back {
  background: transparent;
  color: var(--color-ink);
}

.enrollment-review__back:hover {
  background: var(--color-surface-muted);
}

.enrollment-review__finish {
  gap: 9px;
  min-width: 192px;
  background: var(--color-brand-700);
  color: white;
}

.enrollment-review__finish:hover,
.enrollment-success__download:hover {
  background: var(--color-brand-800);
}

.enrollment-review__back:active,
.enrollment-review__finish:active,
.enrollment-success__actions button:active {
  transform: translateY(1px);
}

.enrollment-success {
  display: flex;
  width: 100%;
  max-width: 760px;
  min-height: 550px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: max(20px, calc((100dvh - 550px) / 2 - 31px)) auto 0;
  border-radius: 12px;
  background: var(--color-surface-strong);
  padding: 0 48px 41px;
  box-shadow: var(--shadow-panel-soft);
  text-align: center;
}

.enrollment-success__icon {
  display: grid;
  width: 170px;
  height: 170px;
  place-items: center;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-brand-50) 38%, transparent);
}

.enrollment-success__icon > span {
  display: grid;
  width: 95px;
  height: 95px;
  place-items: center;
  border-radius: 999px;
  background: var(--color-brand-500);
  color: var(--color-brand-800);
  transform: translateY(8px);
}

.enrollment-success__check {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 999px;
  background: var(--color-brand-800);
  color: var(--color-brand-500);
}

.enrollment-success h1 {
  margin: 6px 0 0;
  color: var(--color-ink);
  font-size: clamp(26px, 3vw, 31px);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.2;
}

.enrollment-success > p {
  max-width: 560px;
  margin: 18px 0 0;
  color: var(--color-ink-soft);
  font-size: 15px;
  line-height: 1.55;
}

.enrollment-success > p strong {
  color: var(--color-ink);
}

.enrollment-success__details {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin: 39px 0 0;
  border-radius: 7px;
  background: var(--color-surface-muted);
  padding: 24px;
  text-align: left;
}

.enrollment-success__details dt,
.enrollment-success__details dd {
  margin: 0;
}

.enrollment-success__details dt {
  color: var(--color-ink-soft);
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.07em;
  line-height: 1.3;
  text-transform: uppercase;
}

.enrollment-success__details dd {
  margin-top: 10px;
  color: var(--color-ink);
  font-size: 20px;
  font-weight: 750;
  line-height: 1.3;
}

.enrollment-success__actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
}

.enrollment-success__actions button {
  display: inline-flex;
  min-height: 50px;
  min-width: 240px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid transparent;
  border-radius: 7px;
  padding: 11px 20px;
  font-size: 15px;
  font-weight: 700;
  transition: background-color 150ms ease, border-color 150ms ease, transform 150ms ease;
}

.enrollment-success__download {
  background: var(--color-brand-500);
  color: white;
}

.enrollment-success__dashboard {
  border-color: var(--color-ink) !important;
  background: transparent;
  color: var(--color-ink);
}

.enrollment-success__dashboard:hover {
  background: var(--color-surface-muted);
}

@media (max-width: 720px) {
  .student-enrollment__stepper-scroll {
    margin-inline: -16px;
    padding-inline: 16px;
  }

  .enrollment-card {
    padding: 22px 17px 18px;
  }

  .enrollment-form-grid--two,
  .enrollment-form-grid--three,
  .enrollment-summary-grid {
    grid-template-columns: 1fr;
  }

  .enrollment-form-grid__full {
    grid-column: auto;
  }

  .enrollment-final-shell {
    padding: 20px 16px 32px;
  }

  .enrollment-final-header__brand {
    font-size: 24px;
  }

  .enrollment-review {
    margin-top: 22px;
    padding: 28px 20px;
  }

  .enrollment-review__stepper {
    min-width: 0;
  }

  .enrollment-review__stepper li {
    font-size: 10px;
  }

  .enrollment-review__summary-grid,
  .review-summary-card__details,
  .enrollment-success__details {
    grid-template-columns: 1fr;
  }

  .review-summary-card--documents {
    grid-column: auto;
  }

  .enrollment-success {
    min-height: 0;
    margin-top: 48px;
    padding: 36px 22px;
  }

  .enrollment-success__details {
    gap: 18px;
  }

  .enrollment-success__actions {
    width: 100%;
    flex-direction: column;
  }

  .enrollment-success__actions button {
    width: 100%;
    min-width: 0;
  }
}

@media (max-width: 480px) {
  .enrollment-card__footer {
    display: grid;
    grid-template-columns: 1fr;
  }

  .enrollment-card__footer .button {
    width: 100%;
  }

  .enrollment-primary-action {
    grid-row: 1;
  }

  .enrollment-review__footer {
    align-items: stretch;
    flex-direction: column-reverse;
  }

  .enrollment-review__back,
  .enrollment-review__finish {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .student-enrollment__breadcrumbs a,
  .enrollment-control {
    transition: none;
  }
}
</style>
