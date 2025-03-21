"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoCopy } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { PasswordDialog } from "@/components/dialogs/password-dialog";
import Password from "./password";

const invoices = [
  {
    invoice: "Google",
    paymentStatus: "Kolosseum123",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Facebook",
    paymentStatus: "Amaramar123",
    totalAmount: "Great",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Netflix",
    paymentStatus: "jfoij32iorfj32;ldkas;lk",
    totalAmount: "Great",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Meta",
    paymentStatus: "asfewfewfWEFasfdowiajf12",
    totalAmount: "Dubious",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Instagram",
    paymentStatus: "42121/kel;kf;ewf#$R#2",
    totalAmount: "Bad",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Snapchat",
    paymentStatus: "dwqrfqwefk32j5432;rsadFSF123",
    totalAmount: "Critical",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Youtube",
    paymentStatus: "fjdwejf324#$#$#2sdfm,dslbv;';",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Google",
    paymentStatus: "Kolosseum123",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Facebook",
    paymentStatus: "Amaramar123",
    totalAmount: "Great",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Netflix",
    paymentStatus: "jfoij32iorfj32;ldkas;lk",
    totalAmount: "Great",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Meta",
    paymentStatus: "asfewfewfWEFasfdowiajf12",
    totalAmount: "Dubious",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Instagram",
    paymentStatus: "42121/kel;kf;ewf#$R#2",
    totalAmount: "Bad",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Snapchat",
    paymentStatus: "dwqrfqwefk32j5432;rsadFSF123",
    totalAmount: "Critical",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Youtube",
    paymentStatus: "fjdwejf324#$#$#2sdfm,dslbv;';",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Youtube",
    paymentStatus: "fjdwejf324#$#$#2sdfm,dslbv;';",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Youtube",
    paymentStatus: "fjdwejf324#$#$#2sdfm,dslbv;';",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Youtube",
    paymentStatus: "fjdwejf324#$#$#2sdfm,dslbv;';",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Youtube",
    paymentStatus: "fjdwejf324#$#$#2sdfm,dslbv;';",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Youtube",
    paymentStatus: "fjdwejf324#$#$#2sdfm,dslbv;';",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
];

export function TableDemo() {
  const [showPasswords, setShowPasswords] = useState(false);

  return (
    <Table className="overflow-auto max-h-full">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white">Source</TableHead>
          <TableHead className="text-white">Password</TableHead>
          <TableHead className="text-white">Strength</TableHead>
          <TableHead className="text-right text-white">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => (
          <TableRow
            key={invoice.invoice + index}
            className="py-4 border-zinc-900"
          >
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>
              <Password invoice={invoice} />
            </TableCell>
            <TableCell>{invoice.totalAmount}</TableCell>
            <TableCell className="text-right">
              <Link href="/dashboard/generate">
                <Button>Change</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
