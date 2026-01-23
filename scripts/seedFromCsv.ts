import { PrismaClient } from '../prisma/generated/prisma'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import 'dotenv/config'

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
})
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
  const rows = readCsvFile('referrals.csv')
  console.log(`  Processing ${rows.length} referrals...`)
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
  const rows = readCsvFile('collectors.csv')
  console.log(`  Processing ${rows.length} collectors...`)
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

async function upsertVendors() {
  const rows = readCsvFile('vendors.csv')
  console.log(`  Processing ${rows.length} vendors...`)
  for (const r of rows) {
    const vendorName = pick(r, 'vendorName', 'name') ?? ''
    if (vendorName) {
      await prisma.vendors.upsert({
        where: { vendorName },
        update: {},
        create: { vendorName },
      })
    }
  }
}

async function upsertDonations() {
  const rows = readCsvFile('donations.csv')
  console.log(`  Processing ${rows.length} donations...`)
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
  const rows = readCsvFile('expenses.csv')
  console.log(`  Processing ${rows.length} expenses...`)
  for (const r of rows) {
    const id = toNumber(pick(r, 'transacId', 'id'))
    const data: any = {
      date: toDate(pick(r, 'date')) ?? new Date(),
      amount: toNumber(pick(r, 'amount')) ?? 0,
      vendorName: pick(r, 'vendorName') ?? '',
      project: pick(r, 'project') ?? '',
      description: pick(r, 'description') ?? null,
      status: pick(r, 'status') ?? 'Pending',
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
  const rows = readCsvFile('payments.csv')
  console.log(`  Processing ${rows.length} payments...`)
  for (const r of rows) {
    const id = toNumber(pick(r, 'paymentId', 'id'))
    const data: any = {
      vendorName: pick(r, 'vendorName') ?? '',
      collectorId: toNumber(pick(r, 'collectorId')) ?? 0,
      type: pick(r, 'type') ?? '',
      amount: toNumber(pick(r, 'amount')) ?? 0,
      date: toDate(pick(r, 'date')) ?? new Date(),
      paymentMethod: pick(r, 'paymentMethod') ?? '',
      status: pick(r, 'status') ?? 'Pending',
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
    console.log('='.repeat(50))
    
    await upsertReferrals()
    console.log('✓ Referrals upserted')
    
    await upsertCollectors()
    console.log('✓ Collectors upserted')
    
    await upsertVendors()
    console.log('✓ Vendors upserted')
    
    await upsertDonations()
    console.log('✓ Donations upserted')
    
    await upsertExpenses()
    console.log('✓ Expenses upserted')
    
    await upsertPayments()
    console.log('✓ Payments upserted')
    
    console.log('='.repeat(50))
    console.log('CSV seeding finished successfully!')
  } catch (error) {
    console.error('Error during seeding:')
    console.error(error)
    throw error
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
