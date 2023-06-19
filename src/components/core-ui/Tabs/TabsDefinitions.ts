import React from "react"

export interface Tab {
  content: any
  label: string
  tabIndex: number
}

export interface TabsProps {
  value: number
  id: string
  tabs: Tab[]
  labels?: string[]
  handleChange?: (event: React.SyntheticEvent, value: number) => void
}