export type WorkOrder = {
  id: number;
  city: string;
  device: string;
  problemCode: string;
  customerName: string;
  processed: boolean;
  detailedProblemDescription: string;
  repairInformation: string;
};