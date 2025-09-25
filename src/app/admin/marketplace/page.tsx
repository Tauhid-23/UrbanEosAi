
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import ProductsTable from './components/ProductsTable';
import CreateProductForm from '../components/CreateProductForm';

export default function AdminMarketplacePage() {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <>
      <div>
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Marketplace Management</CardTitle>
              <CardDescription>
                A table of all marketplace products with management actions.
              </CardDescription>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)} className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </CardHeader>
          <CardContent>
            <ProductsTable />
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
            <DialogDescription>
              Add a new item to the marketplace.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 overflow-y-auto max-h-[70vh]">
            <CreateProductForm />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

    