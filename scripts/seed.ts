// scripts/seed.ts
import { PrismaClient } from '../app/generated/prisma'
import { collectors, referrals } from '../app/data/sampleData'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Seed Collectors
  console.log('Seeding collectors...')
  for (const collectorName of collectors) {
    const collector = await prisma.collectors.upsert({
      where: { collectorId: collectors.indexOf(collectorName) + 1 },
      update: {},
      create: {
        name: collectorName,
      },
    })
    console.log(`Created collector: ${collector.name}`)
  }

  // Seed Referrals
  console.log('Seeding referrals...')
  for (const referralName of referrals) {
    const referral = await prisma.referrals.upsert({
      where: { referralId: referrals.indexOf(referralName) + 1 },
      update: {},
      create: {
        name: referralName,
      },
    })
    console.log(`Created referral: ${referral.name}`)
  }

  // Seed some sample Vendor/Projects
  console.log('Seeding vendors/projects...')
  const vendorProjects = [
    'Office Supplies Co.',
    'Utility Company',
    'Food Distribution Project',
    'IT Services Ltd.',
    'Marketing Agency',
    'Education Program',
  ]

  for (const vendorName of vendorProjects) {
    const vendor = await prisma.vendorsProjects.upsert({
      where: { vendProjId: vendorProjects.indexOf(vendorName) + 1 },
      update: {},
      create: {
        name: vendorName,
      },
    })
    console.log(`Created vendor/project: ${vendor.name}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
