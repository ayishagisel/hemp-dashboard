export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  age: number;
  gender: string;
  preferredProducts: string; // JSON string
  primaryReason: string;
  frequencyOfUse: string;
  preferredShopping: string;
  discoveryMethod: string;
  incomeRange: string;
  occupation: string;
  educationLevel: string;
  communicationMethods: string; // JSON string
  interests: string; // JSON string
  loyaltyMember: boolean;
  createdAt: Date;
  updatedAt: Date;
  emails?: Email[];
}

export interface Email {
  id: number;
  customerId: number;
  subject: string;
  body: string;
  isSent: boolean;
  sentAt?: Date | null;
  gmailDraftId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  customer?: Customer;
}

// Helper types for JSON fields
export interface PreferredProducts {
  products: string[];
}

export interface CommunicationMethods {
  methods: string[];
}

export interface Interests {
  interests: string[];
} 