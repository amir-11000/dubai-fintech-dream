export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          id: string
          metadata: Json | null
          target_id: string | null
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          target_id?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          target_id?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          admin_notes: string | null
          country: string
          cover_letter: string | null
          created_at: string
          current_company: string | null
          cv_path: string | null
          email: string
          first_name: string
          github_url: string | null
          id: string
          ip_address: string | null
          last_name: string
          linkedin_url: string | null
          phone: string
          portfolio_path: string | null
          portfolio_url: string | null
          position_id: string | null
          position_title: string
          source: string | null
          status: string
          supporting_path: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          country: string
          cover_letter?: string | null
          created_at?: string
          current_company?: string | null
          cv_path?: string | null
          email: string
          first_name: string
          github_url?: string | null
          id?: string
          ip_address?: string | null
          last_name: string
          linkedin_url?: string | null
          phone: string
          portfolio_path?: string | null
          portfolio_url?: string | null
          position_id?: string | null
          position_title: string
          source?: string | null
          status?: string
          supporting_path?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          country?: string
          cover_letter?: string | null
          created_at?: string
          current_company?: string | null
          cv_path?: string | null
          email?: string
          first_name?: string
          github_url?: string | null
          id?: string
          ip_address?: string | null
          last_name?: string
          linkedin_url?: string | null
          phone?: string
          portfolio_path?: string | null
          portfolio_url?: string | null
          position_id?: string | null
          position_title?: string
          source?: string | null
          status?: string
          supporting_path?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "job_positions"
            referencedColumns: ["id"]
          },
        ]
      }
      job_positions: {
        Row: {
          application_deadline: string | null
          benefits: string[]
          category: string
          created_at: string
          department: string
          description: string
          employment_type: string
          experience_level: string
          id: string
          is_active: boolean
          location: string
          reporting_to: string | null
          requirements: string[]
          responsibilities: string[]
          salary_range: string | null
          short_description: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
          work_mode: string
        }
        Insert: {
          application_deadline?: string | null
          benefits?: string[]
          category?: string
          created_at?: string
          department: string
          description: string
          employment_type: string
          experience_level: string
          id?: string
          is_active?: boolean
          location: string
          reporting_to?: string | null
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string | null
          short_description: string
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
          work_mode: string
        }
        Update: {
          application_deadline?: string | null
          benefits?: string[]
          category?: string
          created_at?: string
          department?: string
          description?: string
          employment_type?: string
          experience_level?: string
          id?: string
          is_active?: boolean
          location?: string
          reporting_to?: string | null
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string | null
          short_description?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
          work_mode?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_blocked: boolean
          last_login: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_blocked?: boolean
          last_login?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_blocked?: boolean
          last_login?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      talent_pool: {
        Row: {
          admin_notes: string | null
          area_of_interest: string | null
          country: string
          created_at: string
          cv_path: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          linkedin_url: string | null
          message: string | null
          phone: string | null
          portfolio_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          area_of_interest?: string | null
          country: string
          created_at?: string
          cv_path?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          linkedin_url?: string | null
          message?: string | null
          phone?: string | null
          portfolio_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          area_of_interest?: string | null
          country?: string
          created_at?: string
          cv_path?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          linkedin_url?: string | null
          message?: string | null
          phone?: string | null
          portfolio_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          country: string | null
          created_at: string
          email: string
          id: string
          ip_address: string | null
          source: string | null
          user_agent: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
