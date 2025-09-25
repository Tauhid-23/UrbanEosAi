import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import ProductsTable from './components/ProductsTable';

export default function AdminMarketplacePage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Marketplace Management</CardTitle>
           <CardDescription>
            A table of all marketplace products with management actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsTable />
        </CardContent>
      </Card>
    </div>
  );
}
