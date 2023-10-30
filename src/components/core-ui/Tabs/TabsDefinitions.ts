import React from "react"

export interface Tab {
  content: any
  label: string
  tabIndex: number
}

export interface TabsProps {
  tabs: Tab[]
  labels?: string[]
  handleChange?: (event: React.SyntheticEvent, value: number) => void
  value?: number
  id?: string
}