'use client';

import { useState } from 'react';
import { useHealthStatuses, useEquipments } from '@/hooks/useTelemetry';
import { useLogs } from '@/hooks/useLogs';
import { LogReportDialog } from './LogReportDialog';
import { format } from 'date-fns';
import { FileText, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MaintenanceLog } from '@/lib/api/logs';

interface LogsTableProps {
  equipmentId?: number;
  startDate?: string;
  endDate?: string;
}

export function LogsTable({ equipmentId, startDate, endDate }: LogsTableProps) {
  const { data: healthStatuses, isLoading: isStatusesLoading } = useHealthStatuses(equipmentId, startDate, endDate);
  const { data: maintenanceLogs } = useLogs(equipmentId, startDate, endDate);
  const { data: equipments } = useEquipments();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedEqId, setSelectedEqId] = useState<number | undefined>(undefined);
  const [selectedStatusId, setSelectedStatusId] = useState<number | undefined>(undefined);
  const [viewingLog, setViewingLog] = useState<MaintenanceLog | undefined>(undefined);

  const handleOpenCreateForRecord = (eqId: number, statusId: number) => {
    setSelectedEqId(eqId);
    setSelectedStatusId(statusId);
    setViewingLog(undefined);
    setFormOpen(true);
  };

  const handleViewLog = (log: MaintenanceLog) => {
    setViewingLog(log);
    setSelectedEqId(log.equipment);
    setSelectedStatusId(undefined);
    setFormOpen(true);
  };

  const getEquipmentName = (id: number) => {
    const eq = equipments?.find(e => e.id === id);
    return eq ? eq.name : `Node #${id}`;
  };

  return (
    <div className="flex flex-col border border-border/50 rounded-xl bg-background/50 overflow-hidden shadow-sm">
      
      {/* Table Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20">
        <div>
           <h3 className="text-sm font-bold tracking-widest uppercase">Machine Learning Evaluations</h3>
           <p className="text-xs text-muted-foreground mt-0.5">Showing {healthStatuses?.length || 0} AI predictions.</p>
        </div>
      </div>

      {/* Data Table Wrapper with Fixed Height */}
      <div className="overflow-y-auto overflow-x-auto max-h-[60vh] relative min-h-[300px]">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4 font-bold tracking-wider">Evaluation Time</th>
              <th className="px-6 py-4 font-bold tracking-wider">Target Node</th>
              <th className="px-6 py-4 font-bold tracking-wider">System Status</th>
              <th className="px-6 py-4 font-bold tracking-wider">Anomaly Score</th>
              <th className="px-6 py-4 font-bold tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {isStatusesLoading ? (
              <tr>
                 <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-r-transparent"></div>
                 </td>
              </tr>
            ) : healthStatuses?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  No health evaluations found matching your filters.
                </td>
              </tr>
            ) : (
              healthStatuses?.map((status) => {
                // Determine if a Maintenance Log has already been mapped to this exact prediction
                const linkedLog = maintenanceLogs?.find(log => log.description.includes(`#sys_ref:${status.id}`));

                return (
                  <tr key={status.id} className="border-b border-border/50 hover:bg-muted/5 transition-colors group">
                    <td className="px-6 py-4 font-mono text-muted-foreground whitespace-nowrap">
                      {format(new Date(status.prediction_timestamp), 'MMM dd, yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                      {getEquipmentName(status.equipment)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wider uppercase border",
                        status.status === 'CRITICAL' && "bg-red-500/10 text-red-500 border-red-500/20",
                        status.status === 'WARNING' && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                        status.status === 'NORMAL' && "bg-green-500/10 text-green-500 border-green-500/20"
                      )}>
                        {status.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-muted-foreground">
                      {status.anomaly_score.toFixed(3)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {linkedLog ? (
                        <button 
                          onClick={() => handleViewLog(linkedLog)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-muted/50 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md border border-border transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Log
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleOpenCreateForRecord(status.equipment, status.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary hover:text-primary hover:bg-primary/10 rounded-md border border-primary/20 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          File Log
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <LogReportDialog 
          isOpen={formOpen} 
          onClose={() => setFormOpen(false)} 
          defaultEquipmentId={selectedEqId}
          targetStatusId={selectedStatusId}
          initialData={viewingLog}
        />
      )}
    </div>
  );
}
