import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Row from "./row";

const credentials = [
  {
    service: "Google",
    password: "Kolosseum123",
    securityRating: "Good",
    createdAt: "2021-01-01T12:00:00Z",
    lastUpdated: "2021-06-01T12:00:00Z",
    notes: "Primary account password",
  },
  {
    service: "Facebook",
    password: "Amaramar123",
    securityRating: "Great",
    createdAt: "2021-02-15T09:30:00Z",
    lastUpdated: "2021-07-20T14:45:00Z",
    notes: "Updated after breach alert",
  },
  {
    service: "Netflix",
    password: "jfoij32iorfj32;ldkas;lk",
    securityRating: "Great",
    createdAt: "2021-03-10T11:00:00Z",
    lastUpdated: "2021-05-05T08:20:00Z",
    notes: "Shared with family",
  },
  {
    service: "Meta",
    password: "asfewfewfWEFasfdowiajf12",
    securityRating: "Dubious",
    createdAt: "2021-04-22T16:10:00Z",
    lastUpdated: "2021-08-15T10:00:00Z",
    notes: "Needs update soon",
  },
  {
    service: "Instagram",
    password: "42121/kel;kf;ewf#$R#2",
    securityRating: "Bad",
    createdAt: "2021-05-30T07:45:00Z",
    lastUpdated: "2021-07-01T09:00:00Z",
    notes: "Weak password, consider changing",
  },
  {
    service: "Snapchat",
    password: "dwqrfqwefk32j5432;rsadFSF123",
    securityRating: "Critical",
    createdAt: "2021-06-12T13:00:00Z",
    lastUpdated: "2021-08-20T12:30:00Z",
    notes: "Immediate update required",
  },
  {
    service: "Youtube",
    password: "fjdwejf324#$#$#2sdfm,dslbv;';",
    securityRating: "Good",
    createdAt: "2021-07-04T10:15:00Z",
    lastUpdated: "2021-09-10T15:45:00Z",
    notes: "Primary channel account",
  },
  // Duplicate entries updated similarly
  {
    service: "Google",
    password: "Kolosseum123",
    securityRating: "Good",
    createdAt: "2021-01-01T12:00:00Z",
    lastUpdated: "2021-06-01T12:00:00Z",
    notes: "Primary account password",
  },
  {
    service: "Facebook",
    password: "Amaramar123",
    securityRating: "Great",
    createdAt: "2021-02-15T09:30:00Z",
    lastUpdated: "2021-07-20T14:45:00Z",
    notes: "Updated after breach alert",
  },
  {
    service: "Netflix",
    password: "jfoij32iorfj32;ldkas;lk",
    securityRating: "Great",
    createdAt: "2021-03-10T11:00:00Z",
    lastUpdated: "2021-05-05T08:20:00Z",
    notes: "Shared with family",
  },
  {
    service: "Meta",
    password: "asfewfewfWEFasfdowiajf12",
    securityRating: "Dubious",
    createdAt: "2021-04-22T16:10:00Z",
    lastUpdated: "2021-08-15T10:00:00Z",
    notes: "Needs update soon",
  },
  {
    service: "Instagram",
    password: "42121/kel;kf;ewf#$R#2",
    securityRating: "Bad",
    createdAt: "2021-05-30T07:45:00Z",
    lastUpdated: "2021-07-01T09:00:00Z",
    notes: "Weak password, consider changing",
  },
  {
    service: "Snapchat",
    password: "dwqrfqwefk32j5432;rsadFSF123",
    securityRating: "Critical",
    createdAt: "2021-06-12T13:00:00Z",
    lastUpdated: "2021-08-20T12:30:00Z",
    notes: "Immediate update required",
  },
  {
    service: "Youtube",
    password: "fjdwejf324#$#$#2sdfm,dslbv;';",
    securityRating: "Good",
    createdAt: "2021-07-04T10:15:00Z",
    lastUpdated: "2021-09-10T15:45:00Z",
    notes: "Primary channel account",
  },
  {
    service: "Youtube",
    password: "fjdwejf324#$#$#2sdfm,dslbv;';",
    securityRating: "Good",
    createdAt: "2021-07-04T10:15:00Z",
    lastUpdated: "2021-09-10T15:45:00Z",
    notes: "Primary channel account",
  },
  {
    service: "Youtube",
    password: "fjdwejf324#$#$#2sdfm,dslbv;';",
    securityRating: "Good",
    createdAt: "2021-07-04T10:15:00Z",
    lastUpdated: "2021-09-10T15:45:00Z",
    notes: "Primary channel account",
  },
  {
    service: "Youtube",
    password: "fjdwejf324#$#$#2sdfm,dslbv;';",
    securityRating: "Good",
    createdAt: "2021-07-04T10:15:00Z",
    lastUpdated: "2021-09-10T15:45:00Z",
    notes: "Primary channel account",
  },
  {
    service: "Youtube",
    password: "fjdwejf324#$#$#2sdfm,dslbv;';",
    securityRating: "Good",
    createdAt: "2021-07-04T10:15:00Z",
    lastUpdated: "2021-09-10T15:45:00Z",
    notes: "Primary channel account",
  },
  {
    service: "Youtube",
    password: "fjdwejf324#$#$#2sdfm,dslbv;';",
    securityRating: "Good",
    createdAt: "2021-07-04T10:15:00Z",
    lastUpdated: "2021-09-10T15:45:00Z",
    notes: "Primary channel account",
  },
];

export function VaultTable({ showMoreInfo }) {
  return (
    <Table className="max-h-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white">Source</TableHead>
          <TableHead className="text-white">Password</TableHead>
          {showMoreInfo && (
            <TableHead className="text-white text-center">Strength</TableHead>
          )}
          <TableHead className="text-white">Created</TableHead>
          <TableHead className="text-white">Updated</TableHead>
          <TableHead className="text-white">Notes</TableHead>
          <TableHead className="text-right text-white">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="max-h-full overflow-auto">
        {credentials.map((password, index) => (
          <Row
            showMoreInfo={showMoreInfo}
            password={password}
            key={password.service + index}
          />
        ))}
      </TableBody>
    </Table>
  );
}
