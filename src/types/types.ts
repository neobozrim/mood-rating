export interface Rating {
  id?: string;
  event_id: string;
  value: number;
  timestamp: number;
}

export interface Event {
  id: string;
  name: string;
  created_at?: string;
}