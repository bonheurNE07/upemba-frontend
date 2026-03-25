'use client';

import { useState, useEffect } from 'react';
import { useEquipments, useHealthStatuses, useDeleteEquipment } from '@/hooks/useTelemetry';
import { Link } from '@/i18n/routing';
import { EquipmentFormDialog } from './EquipmentFormDialog';
import { Equipment } from '@/lib/api/telemetry';
import { format } from 'date-fns';
import { Search, Plus, Edit2, ArrowUpRight, Trash2 } from 'lucide-react';

export function EquipmentTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const [formOpen, setFormOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | undefined>(undefined);

  // Debounce search input to avoid spamming the backend
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: equipments, isLoading } = useEquipments(debouncedSearch);
  const { data: healthStatuses } = useHealthStatuses();
  const deleteMutation = useDeleteEquipment();

  const handleOpenCreate = () => {
    setEditingEquipment(undefined);
    setFormOpen(true);
  };

  const handleOpenEdit = (equipment: Equipment) => {
    setEditingEquipment(equipment);
    setFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to permanently delete this hardware node? This action destroys all associated historical telemetry data!")) {
      deleteMutation.mutate(id);
    }
  };

  const renderHealthBadge = (equipmentId: number) => {
    const status = healthStatuses?.find(h => h.equipment === equipmentId)?.status;
    
    if (status === 'NORMAL') {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-500 border border-green-500/30">● NORMAL</span>;
    }
    if (status === 'WARNING') {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-500 border border-amber-500/30">● WARNING</span>;
    }
    if (status === 'CRITICAL') {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-500/20 text-red-500 border border-red-500/30">● CRITICAL</span>;
    }
    return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted/50 text-muted-foreground border border-muted">○ UNKNOWN</span>;
  };

  return (
    <div className="flex flex-col border border-border/50 rounded-xl bg-background/50 overflow-hidden shadow-sm">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-border/50 bg-muted/20 gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search MAC, Name, Type..."
            className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center shadow-sm w-full sm:w-auto rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Node
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/10 sticky top-0 shadow-sm z-10">
            <tr>
              <th className="px-6 py-4 font-bold tracking-wider">Health</th>
              <th className="px-6 py-4 font-bold tracking-wider">Node Name</th>
              <th className="px-6 py-4 font-bold tracking-wider">Hardware Type</th>
              <th className="px-6 py-4 font-bold tracking-wider">MAC / IP</th>
              <th className="px-6 py-4 font-bold tracking-wider text-center">Active</th>
              <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                 <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-r-transparent"></div>
                 </td>
              </tr>
            ) : equipments?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  No equipment matched your search criteria.
                </td>
              </tr>
            ) : (
              equipments?.map((eq) => (
                <tr key={eq.id} className="border-b border-border/50 hover:bg-muted/5 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderHealthBadge(eq.id)}
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {eq.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {eq.equipment_type}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground bg-muted/20 rounded inline-flex mt-3 mb-1 ml-6 px-2 py-1">
                    {eq.mac_address}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {eq.is_active ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground border border-border/50">
                        Not Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenEdit(eq)}
                        title="Edit Node settings"
                        className="p-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      
                      <Link 
                        href={`/dashboard?node=${eq.id}`}
                        title="View Live Telemetry" 
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>

                      <button 
                        onClick={() => handleDelete(eq.id)}
                        title="Permanently Delete"
                        className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <EquipmentFormDialog 
          isOpen={formOpen} 
          onClose={() => setFormOpen(false)} 
          initialData={editingEquipment} 
        />
      )}
    </div>
  );
}
