// scripts/seed.ts
import { PrismaClient } from '@/prisma/generated/prisma'
import { collectors, referrals } from '@/app/data/sampleData'

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
