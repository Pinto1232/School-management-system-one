export interface EnrollmentReceiptPdfData {
  studentName: string
  registrationNumber: string
  allocatedClass: string
  academicYear: string
  issuedOn: string
}

export interface EnrollmentReceiptPdfLogo {
  bytes: Uint8Array
  width: number
  height: number
}

const PAGE_WIDTH = 400
const PAGE_HEIGHT = 200

const normalizePdfText = (value: string, maximumLength = 56) => {
  const normalized = value
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()

  return normalized.length > maximumLength
    ? `${normalized.slice(0, maximumLength - 3)}...`
    : normalized
}

const escapePdfText = (value: string, maximumLength?: number) => {
  let escaped = ''

  for (const character of normalizePdfText(value, maximumLength)) {
    const code = character.charCodeAt(0)

    if (character === '\\' || character === '(' || character === ')') {
      escaped += `\\${character}`
    } else if (code >= 32 && code <= 126) {
      escaped += character
    } else if (code <= 255) {
      escaped += `\\${code.toString(8).padStart(3, '0')}`
    } else {
      escaped += '?'
    }
  }

  return escaped
}

const textCommand = (
  text: string,
  x: number,
  y: number,
  size: number,
  font: 'F1' | 'F2' = 'F1',
  color = '0.027 0.102 0.239',
  maximumLength?: number,
) => `BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x} ${y} Tm (${escapePdfText(text, maximumLength)}) Tj ET`

const bytesToHex = (bytes: Uint8Array) => Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')

const logoCommand = (logo?: EnrollmentReceiptPdfLogo) => {
  if (!logo) return ''

  return [
    'q',
    '25 0 0 20 17 174 cm',
    'BI',
    `/W ${logo.width}`,
    `/H ${logo.height}`,
    '/CS /RGB',
    '/BPC 8',
    '/F [/ASCIIHexDecode /DCTDecode]',
    'ID',
    `${bytesToHex(logo.bytes)}>`,
    'EI',
    'Q',
  ].join('\n')
}

export const createEnrollmentReceiptPdfBytes = (data: EnrollmentReceiptPdfData, logo?: EnrollmentReceiptPdfLogo) => {
  const content = [
    'q',
    '1 1 1 rg 0 0 400 200 re f',
    '0.094 0.757 0.682 rg 0 168 400 32 re f',
    logoCommand(logo),
    textCommand('LUSIVO', logo ? 49 : 20, 179, 12, 'F2', '1 1 1'),
    textCommand('COMPROVATIVO DE MATRÍCULA', 20, 143, 14, 'F2'),
    textCommand(`Aluno: ${data.studentName}`, 20, 124, 9, 'F1', '0.322 0.380 0.463', 67),
    '0.843 0.878 0.922 RG 0.8 w 20 114 m 380 114 l S',
    '0.929 0.953 0.973 rg 20 50 360 54 re f',
    textCommand('N.º DE MATRÍCULA', 34, 87, 6.5, 'F2', '0.322 0.380 0.463'),
    textCommand(data.registrationNumber, 34, 68, 11, 'F2'),
    textCommand('TURMA ALOCADA', 151, 87, 6.5, 'F2', '0.322 0.380 0.463'),
    textCommand(data.allocatedClass, 151, 68, 10, 'F2', '0.027 0.102 0.239', 24),
    textCommand('ANO LETIVO', 294, 87, 6.5, 'F2', '0.322 0.380 0.463'),
    textCommand(data.academicYear, 294, 68, 10, 'F2'),
    textCommand(`Emitido em ${data.issuedOn}`, 20, 28, 7.5, 'F1', '0.322 0.380 0.463'),
    textCommand('Matrícula confirmada', 279, 28, 7.5, 'F2', '0.047 0.478 0.447'),
    'Q',
  ].join('\n')

  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>\nendobj\n`,
    `4 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`,
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n',
    '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n',
  ]

  let pdf = '%PDF-1.4\n%LUSIVO\n'
  const offsets: number[] = [0]

  for (const object of objects) {
    offsets.push(pdf.length)
    pdf += object
  }

  const crossReferenceOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'
  pdf += offsets.slice(1).map(offset => `${offset.toString().padStart(10, '0')} 00000 n \n`).join('')
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${crossReferenceOffset}\n%%EOF\n`

  return new TextEncoder().encode(pdf)
}

export const createEnrollmentReceiptPdf = (data: EnrollmentReceiptPdfData, logo?: EnrollmentReceiptPdfLogo) => {
  const bytes = createEnrollmentReceiptPdfBytes(data, logo)
  return new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' })
}

export const loadEnrollmentReceiptLogo = async (source: string): Promise<EnrollmentReceiptPdfLogo> => {
  if (!import.meta.client) throw new Error('O logótipo do comprovativo só pode ser preparado no navegador.')

  const image = new Image()
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () => reject(new Error('Não foi possível carregar o logótipo do comprovativo.'))
    image.src = source
  })

  const canvas = document.createElement('canvas')
  canvas.width = 140
  canvas.height = 112
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Não foi possível preparar o logótipo do comprovativo.')

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, 62, 42, 140, 112, 0, 0, canvas.width, canvas.height)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result)
      else reject(new Error('Não foi possível converter o logótipo do comprovativo.'))
    }, 'image/jpeg', 0.92)
  })

  return {
    bytes: new Uint8Array(await blob.arrayBuffer()),
    width: canvas.width,
    height: canvas.height,
  }
}

export const enrollmentReceiptPdfDimensions = {
  width: PAGE_WIDTH,
  height: PAGE_HEIGHT,
} as const
