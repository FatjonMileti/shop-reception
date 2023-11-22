import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GovernanceDomainModel } from 'shared/interfaces'

export interface GovernanceDomainsState {
  domains: GovernanceDomainModel[]
}

export const governanceDomainsInitialState: GovernanceDomainsState = {
  domains: null
}

export const GovernanceDomainsSlice = createSlice({
  name: 'governanceDomains',
  initialState: governanceDomainsInitialState,
  reducers: {
    setData: (state: GovernanceDomainsState, action: PayloadAction<GovernanceDomainModel[]>) => {
      state.domains = action.payload
    }
  }
})

export const GovernanceDomainsActions = GovernanceDomainsSlice.actions
export const GovernanceDomainsReducer = GovernanceDomainsSlice.reducer
