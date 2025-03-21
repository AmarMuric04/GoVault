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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "····················",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "····················",
    totalAmount: "Great",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "····················",
    totalAmount: "Great",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "····················",
    totalAmount: "Dubious",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "····················",
    totalAmount: "Bad",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "····················",
    totalAmount: "Critical",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "····················",
    totalAmount: "Good",
    paymentMethod: "Credit Card",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white">Source</TableHead>
          <TableHead className="text-white">Password</TableHead>
          {/* <TableHead className="text-white"></TableHead> */}
          <TableHead className="text-right text-white">Strength</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice} className="py-4 border-zinc-900">
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            {/* <TableCell>{invoice.paymentMethod}</TableCell> */}
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
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
