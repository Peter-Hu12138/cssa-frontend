/**
 * CSSA Member Website API Types
 * Generated based on OpenAPI 3.0.3 Schema
 */

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Enums
export type CategoryEnum = 'proposal' | 'budget' | 'schedule' | 'presentation' | 'other';

export type RoleWithinDepartmentEnum = '' | 'HD' | 'DH';

export type StatusEnum = 
  | 'PENDING' 
  | 'DEPT_HEAD_APPROVED' 
  | 'SUPER_DEPT_HEAD_APPROVED' 
  | 'REJECTED';

export type TitleEnum = '' | 'P' | 'VP' | 'D' | 'DD';

export type JobStatusEnum = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PENDING_COMPLETION_APPROVAL' | 'COMPLETED';

// Models

export interface Article {
  id: number;
  title: string;
  content: string;
  image?: string | null; // format: uri
  created_at: string; // format: date-time
}

export interface ExternalLink {
  id: number;
  name: string;
  slug: string;
  url: string;
  icon_name: string;
  order: number;
}

export interface Department {
  id: number;
  name: string;
  english_name?: string;
  super_department?: number | null;
  super_department_name: string;
}

export interface MemberPublic {
  id: number;
  full_name: string;
  short_name: string;
  department_name: string;
  role_within_department?: RoleWithinDepartmentEnum;
  title?: TitleEnum;
  date_of_registration?: string;
  preferred_name?: string | null;
  faculty?: string | null;
  college?: string | null;
  program?: string | null;
  year_of_study?: number | null;
  student_status?: string;
}

export interface EventAttachment {
  id: number;
  file_url: string;
  category?: CategoryEnum;
  description?: string;
  uploaded_at: string; // format: date-time
}

export interface Event {
  id: number;
  uuid?: string; // format: uuid
  name: string;
  description: string;
  department_in_charge: number;
  department_in_charge_detail: Department;
  leader: number;
  leader_detail: MemberPublic;
  eventdate?: string; // format: date-time
  eventEndTime?: string; // format: date-time
  status?: StatusEnum;
  image?: string | null; // Added for frontend compatibility
  created_at: string; // format: date-time
  updated_at: string; // format: date-time
  attachments: EventAttachment[];
}

export interface TokenObtainPair {
  access: string;
  refresh: string;
}

export interface TokenRefresh {
  access: string;
  refresh: string;
}

export interface JobAttachment {
  id: number;
  file_url: string;
  original_filename: string;
  category: string;
  description?: string;
  uploaded_at: string;
  uploaded_by: number;
  uploaded_by_detail: MemberPublic;
}

export interface JobRecord {
  id: number;
  job: number;
  participant: number;
  participant_detail: MemberPublic;
  duration: number;
  primary_skill: string;
  secondary_skill_1?: string;
  secondary_skill_2?: string;
  job_summary?: string;
  relation_personal_goal?: string;
  areas_of_improvement?: string;
  created_at: string;
}

export interface JobApproval {
  id: number;
  action: string;
  performed_by: number;
  performed_by_detail: MemberPublic;
  performed_at: string;
  comments?: string;
}

export interface Job {
  id: number;
  name: string;
  parent_job?: number | null;
  parent_event?: number | null;
  parent_event_detail?: Event;
  description: string;
  leader: number[];
  leader_details: MemberPublic[];
  status: JobStatusEnum;
  status_display: string;
  created_by: number;
  created_by_detail: MemberPublic;
  created_at: string;
  updated_at: string;
  approved_at?: string | null;
  approved_by?: number | null;
  rejected_at?: string | null;
  rejected_by?: number | null;
  feedback?: string;
  completion_submitted_at?: string | null;
  completion_submitted_by?: number | null;
  completion_approved_at?: string | null;
  completion_approved_by?: number | null;
  completion_rejected_at?: string | null;
  completion_rejected_by?: number | null;
  completion_feedback?: string;
  attachments: JobAttachment[];
  records: JobRecord[];
  approval_history: JobApproval[];
  sub_jobs?: { id: number; name: string; status: string }[];
}
