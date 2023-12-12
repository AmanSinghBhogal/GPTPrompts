import '@styles/globals.css';

export const metadata = {
    title: 'GPT Prompts',
    description: 'Discover & Share AI Prompts'
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <div className="main">
            <div className="gradient" />
        </div>
        <main className="app">
            {children}
        </main>
    </html>
  )
}

export default RootLayout;