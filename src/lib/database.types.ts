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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          admin_user_id: string | null
          changed_fields: Json
          created_at: string
          entity_id: number | null
          entity_type: string
          id: number
        }
        Insert: {
          action: string
          admin_user_id?: string | null
          changed_fields?: Json
          created_at?: string
          entity_id?: number | null
          entity_type: string
          id?: number
        }
        Update: {
          action?: string
          admin_user_id?: string | null
          changed_fields?: Json
          created_at?: string
          entity_id?: number | null
          entity_type?: string
          id?: number
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          display_name: string
          is_active: boolean
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name: string
          is_active?: boolean
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          is_active?: boolean
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      place_guides: {
        Row: {
          about_en: string | null
          about_km: string | null
          created_at: string
          highlights_en: string | null
          highlights_km: string | null
          history_en: string | null
          history_km: string | null
          id: number
          place_id: number
          source_urls: Json
          tips_en: string | null
          tips_km: string | null
          updated_at: string
          visit_plan_en: string | null
          visit_plan_km: string | null
        }
        Insert: {
          about_en?: string | null
          about_km?: string | null
          created_at?: string
          highlights_en?: string | null
          highlights_km?: string | null
          history_en?: string | null
          history_km?: string | null
          id?: number
          place_id: number
          source_urls?: Json
          tips_en?: string | null
          tips_km?: string | null
          updated_at?: string
          visit_plan_en?: string | null
          visit_plan_km?: string | null
        }
        Update: {
          about_en?: string | null
          about_km?: string | null
          created_at?: string
          highlights_en?: string | null
          highlights_km?: string | null
          history_en?: string | null
          history_km?: string | null
          id?: number
          place_id?: number
          source_urls?: Json
          tips_en?: string | null
          tips_km?: string | null
          updated_at?: string
          visit_plan_en?: string | null
          visit_plan_km?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "place_guides_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: true
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          access_en: string | null
          access_km: string | null
          business_type: string | null
          category: string
          created_at: string
          id: number
          image_url: string | null
          lat: number | null
          listing_type: string
          lng: number | null
          name_en: string
          name_km: string
          open_hours: string | null
          province_id: number
          publication_status: string
          slug: string
          source_urls: Json
          summary_en: string | null
          summary_km: string | null
          ticket_provider: string | null
          ticket_status: string | null
          ticket_url: string | null
          ticket_usd: number | null
          updated_at: string
          views: number
        }
        Insert: {
          access_en?: string | null
          access_km?: string | null
          business_type?: string | null
          category: string
          created_at?: string
          id?: number
          image_url?: string | null
          lat?: number | null
          listing_type?: string
          lng?: number | null
          name_en: string
          name_km: string
          open_hours?: string | null
          province_id: number
          publication_status?: string
          slug: string
          source_urls?: Json
          summary_en?: string | null
          summary_km?: string | null
          ticket_provider?: string | null
          ticket_status?: string | null
          ticket_url?: string | null
          ticket_usd?: number | null
          updated_at?: string
          views?: number
        }
        Update: {
          access_en?: string | null
          access_km?: string | null
          business_type?: string | null
          category?: string
          created_at?: string
          id?: number
          image_url?: string | null
          lat?: number | null
          listing_type?: string
          lng?: number | null
          name_en?: string
          name_km?: string
          open_hours?: string | null
          province_id?: number
          publication_status?: string
          slug?: string
          source_urls?: Json
          summary_en?: string | null
          summary_km?: string | null
          ticket_provider?: string | null
          ticket_status?: string | null
          ticket_url?: string | null
          ticket_usd?: number | null
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "places_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "provinces"
            referencedColumns: ["id"]
          },
        ]
      }
      province_guides: {
        Row: {
          attractions_en: string
          attractions_km: string
          created_at: string
          culture_en: string | null
          culture_km: string | null
          food_guide_en: string
          food_guide_km: string
          history_en: string | null
          history_km: string | null
          id: number
          overview_en: string
          overview_km: string
          province_id: number
          source_urls: Json
          stay_guide_en: string
          stay_guide_km: string
          story_en: string | null
          story_km: string | null
          travel_en: string | null
          travel_km: string | null
          updated_at: string
        }
        Insert: {
          attractions_en: string
          attractions_km: string
          created_at?: string
          culture_en?: string | null
          culture_km?: string | null
          food_guide_en: string
          food_guide_km: string
          history_en?: string | null
          history_km?: string | null
          id?: number
          overview_en: string
          overview_km: string
          province_id: number
          source_urls?: Json
          stay_guide_en: string
          stay_guide_km: string
          story_en?: string | null
          story_km?: string | null
          travel_en?: string | null
          travel_km?: string | null
          updated_at?: string
        }
        Update: {
          attractions_en?: string
          attractions_km?: string
          created_at?: string
          culture_en?: string | null
          culture_km?: string | null
          food_guide_en?: string
          food_guide_km?: string
          history_en?: string | null
          history_km?: string | null
          id?: number
          overview_en?: string
          overview_km?: string
          province_id?: number
          source_urls?: Json
          stay_guide_en?: string
          stay_guide_km?: string
          story_en?: string | null
          story_km?: string | null
          travel_en?: string | null
          travel_km?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "province_guides_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: true
            referencedRelation: "provinces"
            referencedColumns: ["id"]
          },
        ]
      }
      provinces: {
        Row: {
          banner_image_url: string | null
          created_at: string
          id: number
          name_en: string
          name_km: string
          slug: string
          updated_at: string
        }
        Insert: {
          banner_image_url?: string | null
          created_at?: string
          id?: number
          name_en: string
          name_km: string
          slug: string
          updated_at?: string
        }
        Update: {
          banner_image_url?: string | null
          created_at?: string
          id?: number
          name_en?: string
          name_km?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_save_place: {
        Args: {
          p_id: number
          p_payload: Json
          p_guide: Json
          p_save_guide: boolean
          p_intent: string
        }
        Returns: string
      }
      admin_save_province: {
        Args: {
          p_id: number
          p_payload: Json
          p_guide: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
