import {
  Target,
  Eye,
  Users,
  TrendingUp,
  Wrench,
  BookOpen,
  ClipboardCheck,
  Network,
  ClipboardList,
  Clock,
  Mail,
  Linkedin,
  CircleCheck,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const siteIcons = {
  qaProcesses: Target,
  qualityMindset: Eye,
  careerAdvice: Users,
  industryTrends: TrendingUp,
  toolsAndTechnology: Wrench,
  caseStudies: BookOpen,
  releaseGovernance: ClipboardCheck,
  technicalDelivery: Network,
  focusedReview: ClipboardList,
  timeOrEngagement: Clock,
  email: Mail,
  linkedin: Linkedin,
  listConfirmation: CircleCheck,
  directionalLink: ArrowRight,
} as const;

export type SiteIconKey = keyof typeof siteIcons;

export const getSiteIcon = (key: SiteIconKey): LucideIcon => siteIcons[key];
