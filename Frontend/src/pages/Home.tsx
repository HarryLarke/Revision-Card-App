import { useGetBundlesQuery } from '../features/bundles/bundlesSlice'
import Bundle from '../components/Bundle'
import AddBundle from '../components/AddBundle'

const Home = () => {

  const {
    data: bundles,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBundlesQuery()

  let content 

  console.log(bundles)
  console.log(isLoading)

  //could have it so it selected and get bundle by id?

  if(isLoading) {
    content = <p>Loading Bundles...</p>
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>
  } else if (isSuccess) {
    content = <section className='Section-Multiple'>
      {bundles.map((bundle) => 
      <Bundle 
      key={bundle._id} 
      _id={bundle._id}
      title={bundle.title} 
      description={bundle.description}/> )}

      <AddBundle/>
    </section>
  }

  return content
}

export default Home
