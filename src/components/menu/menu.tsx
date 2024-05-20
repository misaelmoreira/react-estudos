import { FC, Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'

import styles from './menu.module.css'
import { Loading } from '../loading/loading'

export const Menu: FC = () => (
    <div className={styles.wrapper}>
        <aside className={styles.menu}>
            <nav>
                <ul>
                    <li>
                    <Link to="/dashboard">Início</Link>
                    </li>
                    <li>
                    <Link to="/dashboard/tasks">Tarefas</Link>
                    </li>
                    <li>
                    <Link to="/logout">Sair</Link>
                    </li>
                </ul>
            </nav>
        </aside>
        <main className='container'>
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </main>
    </div>
  )