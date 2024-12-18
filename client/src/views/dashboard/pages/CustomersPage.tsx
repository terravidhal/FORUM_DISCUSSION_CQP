import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CustomersPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default CustomersPage;
