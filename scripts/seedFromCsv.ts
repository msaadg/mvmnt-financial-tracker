import { PrismaClient } from '../app/generated/prisma'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

const prisma = new PrismaClient()
const DATA_DIR = path.join(__dirname, '..', 'prisma', 'seed_tables_data')

function readCsvFile(filename: string) {
  const p = path.join(DATA_DIR, filename)
  if (!fs.existsSync(p)) return []
  const content = fs.readFileSync(p, 'utf8')
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[]
  return records
}

const toNumber = (v?: string | null) => {
  if (v === undefined || v === null || v === '') return undefined
  const n = Number(v)
  return Number.isNaN(n) ? undefined : n
}
const toDate = (v?: string | null) => {
  if (!v) return undefined
  const d = new Date(v)
  return isNaN(d.getTime()) ? undefined : d
}
const pick = (row: Record<string, string>, ...keys: string[]) => {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== '') return row[k]
  }
  return undefined
}

async function upsertReferrals() {
  const rows = await readCsvFile('referrals.csv')
  for (const r of rows) {
    const id = toNumber(pick(r, 'referralId', 'id'))
    const name = pick(r, 'name') ?? ''
    if (id) {
      await prisma.referrals.upsert({
        where: { referralId: id },
        update: { name },
        create: { referralId: id, name },
      })
    } else {
      await prisma.referrals.create({ data: { name } })
    }
  }
}

async function upsertCollectors() {
  const rows = await readCsvFile('collectors.csv')
  for (const r of rows) {
    const id = toNumber(pick(r, 'collectorId', 'id'))
    const name = pick(r, 'name') ?? ''
    if (id) {
      await prisma.collectors.upsert({
        where: { collectorId: id },
        update: { name },
        create: { collectorId: id, name },
      })
    } else {
      await prisma.collectors.create({ data: { name } })
    }
  }
}

async function upsertVendorsProjects() {
  const rows = await readCsvFile('projects.csv')
  for (const r of rows) {
    const id = toNumber(pick(r, 'vendProjId', 'vendorProjId', 'id'))
    const name = pick(r, 'name') ?? ''
    if (id) {
      await prisma.vendorsProjects.upsert({
        where: { vendProjId: id },
        update: { name },
        create: { vendProjId: id, name },
      })
    } else {
      await prisma.vendorsProjects.create({ data: { name } })
    }
  }
}

async function upsertDonations() {
  const rows = await readCsvFile('donations.csv')
  for (const r of rows) {
    const id = toNumber(pick(r, 'transacId', 'id'))
    const data: any = {
      date: toDate(pick(r, 'date')) ?? new Date(),
      amount: toNumber(pick(r, 'amount')) ?? 0,
      paymentMethod: pick(r, 'paymentMethod') ?? '',
      donorName: pick(r, 'donorName') ?? '',
      referralId: toNumber(pick(r, 'referralId')) ?? 0,
      collectorId: toNumber(pick(r, 'collectorId')) ?? 0,
      type: pick(r, 'type') ?? '',
      status: pick(r, 'status') ?? '',
      notes: pick(r, 'notes') ?? null,
    }
    if (id) {
      await prisma.donation.upsert({
        where: { transacId: id },
        update: data,
        create: { transacId: id, ...data },
      })
    } else {
      await prisma.donation.create({ data })
    }
  }
}

async function upsertExpenses() {
  const rows = await readCsvFile('expenses.csv')
  for (const r of rows) {
    const id = toNumber(pick(r, 'transacId', 'id'))
    const data: any = {
      date: toDate(pick(r, 'date')) ?? new Date(),
      amount: toNumber(pick(r, 'amount')) ?? 0,
      paymentMethod: pick(r, 'paymentMethod') ?? '',
      vendorProjId: toNumber(pick(r, 'vendorProjId', 'vendProjId')) ?? 0,
      category: pick(r, 'category') ?? '',
      description: pick(r, 'description') ?? null,
      status: pick(r, 'status') ?? '',
    }
    if (id) {
      await prisma.expenses.upsert({
        where: { transacId: id },
        update: data,
        create: { transacId: id, ...data },
      })
    } else {
      await prisma.expenses.create({ data })
    }
  }
}

async function upsertPayments() {
  const rows = await readCsvFile('payments.csv')
  for (const r of rows) {
    const id = toNumber(pick(r, 'paymentId', 'id'))
    const data: any = {
      expenseId: toNumber(pick(r, 'expenseId')) ?? null,
      collectorId: toNumber(pick(r, 'collectorId')) ?? 0,
      type: pick(r, 'type') ?? '',
      amount: toNumber(pick(r, 'amount')) ?? 0,
    }
    if (id) {
      await prisma.payment.upsert({
        where: { paymentId: id },
        update: data,
        create: { paymentId: id, ...data },
      })
    } else {
      await prisma.payment.create({ data })
    }
  }
}

export async function main() {
  try {
    console.log('Starting CSV seeding from', DATA_DIR)
    await upsertReferrals()
    console.log('Referrals upserted')
    await upsertCollectors()
    console.log('Collectors upserted')
    await upsertVendorsProjects()
    console.log('Vendors/Projects upserted')
    await upsertDonations()
    console.log('Donations upserted')
    await upsertExpenses()
    console.log('Expenses upserted')
    await upsertPayments()
    console.log('Payments upserted')
    console.log('CSV seeding finished.')
  } finally {
    await prisma.$disconnect()
  }
}

// If run directly with ts-node
if (require.main === module) {
  main().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
