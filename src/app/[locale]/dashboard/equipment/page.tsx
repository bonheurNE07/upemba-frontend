import { getTranslations } from 'next-intl/server';
import { EquipmentMetrics } from '@/components/features/equipment/EquipmentMetrics';
import { EquipmentTable } from '@/components/features/equipment/EquipmentTable';

export default async function EquipmentDashboardPage() {
  const t = await getTranslations('Dashboard');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Hardware Directory
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage deployed sensor nodes and IoT equipment across the park.
          </p>
        </div>
      </div>

      <EquipmentMetrics />
      <EquipmentTable />
    </div>
  );
}
