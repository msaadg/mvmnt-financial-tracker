#!/usr/bin/env python3
"""
Data cleaning script to generate CSV files for seeding the database.
This script reads the Excel file and generates CSV files matching the new schema.

Usage:
    python data-cleaning-script.py
"""

import pandas as pd
import numpy as np
from pathlib import Path

# Configuration
EXCEL_FILE = 'Ramazan 2024 v1.xlsx'
OUTPUT_DIR = 'seed_tables_data'

def main():
    print("=" * 60)
    print("Data Cleaning Script - Generating CSV Files")
    print("=" * 60)
    
    # Create output directory if it doesn't exist
    Path(OUTPUT_DIR).mkdir(exist_ok=True)
    
    # Read Excel file
    print(f"\n1. Reading Excel file: {EXCEL_FILE}")
    df = pd.read_excel(EXCEL_FILE)
    print(f"   ✓ Loaded {len(df)} rows")
    
    # Extract Referrals
    print("\n2. Extracting Referrals...")
    referrals = df.iloc[1:, 0].unique().tolist()
    referrals.pop()  # Remove last item
    df_referrals = pd.DataFrame(data={"name": referrals})
    df_referrals["referralId"] = df_referrals.index + 1
    df_referrals.to_csv(f'{OUTPUT_DIR}/referrals.csv', index=False)
    print(f"   ✓ Generated referrals.csv ({len(df_referrals)} records)")
    
    # Extract Collectors
    print("\n3. Extracting Collectors...")
    collectors = df.iloc[1:, 1].unique().tolist()
    collectors.pop()  # Remove last item
    df_collectors = pd.DataFrame(data={"name": collectors})
    df_collectors["collectorId"] = df_collectors.index + 1
    df_collectors.to_csv(f'{OUTPUT_DIR}/collectors.csv', index=False)
    print(f"   ✓ Generated collectors.csv ({len(df_collectors)} records)")
    
    # Extract Vendors
    print("\n4. Extracting Vendors...")
    vendors_sadqa = df.loc[df.iloc[:, 7].astype(str).str.startswith("-"), df.columns[2]].unique().tolist()
    vendors_zakat = df.loc[df.iloc[:, 5].astype(str).str.startswith("-"), df.columns[2]].unique().tolist()
    all_vendors = list(set(vendors_sadqa + vendors_zakat))
    all_vendors = [v for v in all_vendors if pd.notna(v)]  # Remove NaN
    df_vendors = pd.DataFrame(data={"vendorName": sorted(all_vendors)})
    df_vendors.to_csv(f'{OUTPUT_DIR}/vendors.csv', index=False)
    print(f"   ✓ Generated vendors.csv ({len(df_vendors)} records)")
    
    # Extract Expenses - Sadqa
    print("\n5. Extracting Expenses (Sadqa)...")
    expenses_sadqa = df.loc[df.iloc[:, 7].astype(str).str.startswith("-"), [df.columns[i] for i in [3, 7, 2]]]
    expenses_sadqa.columns = ["date", "amount", "vendorProj"]
    expenses_sadqa["amount"] = -expenses_sadqa["amount"].astype(int)
    expenses_sadqa["vendorName"] = expenses_sadqa["vendorProj"]
    expenses_sadqa["project"] = expenses_sadqa["vendorProj"]
    expenses_sadqa["description"] = ""
    expenses_sadqa["status"] = "Pending"
    expenses_sadqa.drop(columns=["vendorProj"], inplace=True)
    expenses_sadqa.reset_index(drop=True, inplace=True)
    print(f"   ✓ Processed {len(expenses_sadqa)} Sadqa expenses")
    
    # Extract Expenses - Zakat
    print("\n6. Extracting Expenses (Zakat)...")
    expenses_zakat = df.loc[df.iloc[:, 5].astype(str).str.startswith("-"), [df.columns[i] for i in [3, 5, 2]]]
    expenses_zakat.columns = ["date", "amount", "vendorProj"]
    expenses_zakat["amount"] = -expenses_zakat["amount"].astype(int)
    expenses_zakat["vendorName"] = expenses_zakat["vendorProj"]
    expenses_zakat["project"] = expenses_zakat["vendorProj"]
    expenses_zakat["description"] = ""
    expenses_zakat["status"] = "Pending"
    expenses_zakat.drop(columns=["vendorProj"], inplace=True)
    expenses_zakat.reset_index(drop=True, inplace=True)
    print(f"   ✓ Processed {len(expenses_zakat)} Zakat expenses")
    
    # Combine expenses
    print("\n7. Combining all expenses...")
    expenses_df = pd.concat([expenses_sadqa, expenses_zakat], ignore_index=True)
    expenses_df["transacId"] = expenses_df.index + 1
    expenses_table = expenses_df[["transacId", "date", "amount", "vendorName", "project", "description", "status"]]
    expenses_table.to_csv(f'{OUTPUT_DIR}/expenses.csv', index=False)
    print(f"   ✓ Generated expenses.csv ({len(expenses_table)} records)")
    
    # Extract Payments - Sadqa
    print("\n8. Extracting Payments (Sadqa)...")
    payments_sadqa = df.loc[df.iloc[:, 7].astype(str).str.startswith("-"), [df.columns[i] for i in [3, 1, 7, 4, 2]]]
    payments_sadqa.columns = ["date", "collector", "amount", "paymentMethod", "vendorProj"]
    payments_sadqa["collectorId"] = payments_sadqa["collector"].map(lambda x: collectors.index(x) + 1)
    payments_sadqa["amount"] = -payments_sadqa["amount"].astype(int)
    payments_sadqa["paymentMethod"] = payments_sadqa["paymentMethod"].map(lambda x: "Cash" if x == "Cash" else "Online")
    payments_sadqa["vendorName"] = payments_sadqa["vendorProj"]
    payments_sadqa["type"] = "Sadqa"
    payments_sadqa["status"] = "Completed"
    payments_sadqa.drop(columns=["vendorProj", "collector"], inplace=True)
    payments_sadqa.reset_index(drop=True, inplace=True)
    print(f"   ✓ Processed {len(payments_sadqa)} Sadqa payments")
    
    # Extract Payments - Zakat
    print("\n9. Extracting Payments (Zakat)...")
    payments_zakat = df.loc[df.iloc[:, 5].astype(str).str.startswith("-"), [df.columns[i] for i in [3, 1, 5, 4, 2]]]
    payments_zakat.columns = ["date", "collector", "amount", "paymentMethod", "vendorProj"]
    payments_zakat["collectorId"] = payments_zakat["collector"].map(lambda x: collectors.index(x) + 1)
    payments_zakat["amount"] = -payments_zakat["amount"].astype(int)
    payments_zakat["paymentMethod"] = payments_zakat["paymentMethod"].map(lambda x: "Cash" if x == "Cash" else "Online")
    payments_zakat["vendorName"] = payments_zakat["vendorProj"]
    payments_zakat["type"] = "Zakat"
    payments_zakat["status"] = "Completed"
    payments_zakat.drop(columns=["vendorProj", "collector"], inplace=True)
    payments_zakat.reset_index(drop=True, inplace=True)
    print(f"   ✓ Processed {len(payments_zakat)} Zakat payments")
    
    # Combine payments
    print("\n10. Combining all payments...")
    payments_df = pd.concat([payments_sadqa, payments_zakat], ignore_index=True)
    payments_df["paymentId"] = payments_df.index + 1
    payments_table = payments_df[["paymentId", "vendorName", "collectorId", "type", "amount", "date", "paymentMethod", "status"]]
    payments_table.to_csv(f'{OUTPUT_DIR}/payments.csv', index=False)
    print(f"   ✓ Generated payments.csv ({len(payments_table)} records)")
    
    # Extract Donations - Sadqa
    print("\n11. Extracting Donations (Sadqa)...")
    donations_sadqa = df.loc[
        ~df.iloc[:, 7].astype(str).str.startswith("-") & 
        df.iloc[:, 7].notna() & 
        (df.iloc[:, 7] != ''), 
        [df.columns[i] for i in [3, 7, 4, 2, 1]]
    ]
    donations_sadqa.columns = ["date", "amount", "paymentMethod", "donorName", "collector"]
    donations_sadqa = donations_sadqa[donations_sadqa["amount"] != "Collection"]
    donations_sadqa["amount"] = pd.to_numeric(donations_sadqa["amount"], errors='coerce')
    donations_sadqa = donations_sadqa[donations_sadqa["amount"] > 0]
    donations_sadqa["referralId"] = donations_sadqa["donorName"].map(lambda x: referrals.index(x) + 1 if x in referrals else 1)
    donations_sadqa["collectorId"] = donations_sadqa["collector"].map(lambda x: collectors.index(x) + 1 if x in collectors else 1)
    donations_sadqa["paymentMethod"] = donations_sadqa["paymentMethod"].map(lambda x: "Cash" if str(x) == "Cash" else "Online")
    donations_sadqa["type"] = "Sadqa"
    donations_sadqa["status"] = "Completed"
    donations_sadqa["notes"] = ""
    donations_sadqa.drop(columns=["collector"], inplace=True)
    donations_sadqa.reset_index(drop=True, inplace=True)
    print(f"   ✓ Processed {len(donations_sadqa)} Sadqa donations")
    
    # Extract Donations - Zakat
    print("\n12. Extracting Donations (Zakat)...")
    donations_zakat = df.loc[
        ~df.iloc[:, 5].astype(str).str.startswith("-") & 
        df.iloc[:, 5].notna() & 
        (df.iloc[:, 5] != ''), 
        [df.columns[i] for i in [3, 5, 4, 2, 1]]
    ]
    donations_zakat.columns = ["date", "amount", "paymentMethod", "donorName", "collector"]
    donations_zakat = donations_zakat[donations_zakat["amount"] != "Collection"]
    donations_zakat["amount"] = pd.to_numeric(donations_zakat["amount"], errors='coerce')
    donations_zakat = donations_zakat[donations_zakat["amount"] > 0]
    donations_zakat["referralId"] = donations_zakat["donorName"].map(lambda x: referrals.index(x) + 1 if x in referrals else 1)
    donations_zakat["collectorId"] = donations_zakat["collector"].map(lambda x: collectors.index(x) + 1 if x in collectors else 1)
    donations_zakat["paymentMethod"] = donations_zakat["paymentMethod"].map(lambda x: "Cash" if str(x) == "Cash" else "Online")
    donations_zakat["type"] = "Zakat"
    donations_zakat["status"] = "Completed"
    donations_zakat["notes"] = ""
    donations_zakat.drop(columns=["collector"], inplace=True)
    donations_zakat.reset_index(drop=True, inplace=True)
    print(f"   ✓ Processed {len(donations_zakat)} Zakat donations")
    
    # Combine donations
    print("\n13. Combining all donations...")
    donations_df = pd.concat([donations_sadqa, donations_zakat], ignore_index=True)
    donations_df["transacId"] = donations_df.index + 1
    donations_table = donations_df[["transacId", "date", "amount", "donorName", "referralId", "collectorId", "type", "status", "notes", "paymentMethod"]]
    donations_table.to_csv(f'{OUTPUT_DIR}/donations.csv', index=False)
    print(f"   ✓ Generated donations.csv ({len(donations_table)} records)")
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY - Generated CSV Files:")
    print("=" * 60)
    print(f"  • referrals.csv    : {len(df_referrals)} records")
    print(f"  • collectors.csv   : {len(df_collectors)} records")
    print(f"  • vendors.csv      : {len(df_vendors)} records")
    print(f"  • expenses.csv     : {len(expenses_table)} records")
    print(f"  • payments.csv     : {len(payments_table)} records")
    print(f"  • donations.csv    : {len(donations_table)} records")
    print("=" * 60)
    print(f"\n✓ All files saved to: {OUTPUT_DIR}/")
    print("\nNext steps:")
    print("  1. Review the generated CSV files")
    print("  2. Run the seeding script: npx tsx scripts/seedFromCsv.ts")
    print()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()
        exit(1)
