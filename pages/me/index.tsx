import type { ReactElement } from 'react'
import { ProfileView } from '@views/index'
import WithLayout, { Simple } from 'src/layouts'

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
    revalidate: 10,
  }
}

const Me = () => {
  return <ProfileView />
}

Me.getLayout = function getLayout(page: ReactElement) {
  return <WithLayout layout={Simple} component={page} />
}

Me.auth = true;

export default Me
