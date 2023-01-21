import React from 'react'
import Contacts from './components/Contacts'

export const InternalApp: React.FC = (props) => {

  // const [state, send, service] = useMachine(appMachine, {
  //   devTools: true,
  //   services: {

  //   },
  //   actions: {

  //     // submit: () => submit(isLoading),
  //     // toastStashedLocally: () => setError && setError(undefined),
  //     // toastErrorStashingLocal: () => setError && setError(AUTOSAVE_ERROR.localError),
  //     // toastSubmitFailed: () => setError && setError(AUTOSAVE_ERROR.onlineError),
  //     // updateCurrentEntity: () => setError && setError(undefined)
  //   },
  // })
  // React.useEffect(() => () => { service.stop() }, [])

  return (
    <Contacts />
  )
}