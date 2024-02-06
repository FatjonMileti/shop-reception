import React from "react"

export interface Tab {
  content: any
  label: string
  tabIndex: number
}

export interface TabsProps {
  tabs: Tab[],
  tabsContainerStyle?: any
}