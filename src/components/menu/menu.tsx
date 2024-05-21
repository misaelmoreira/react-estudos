import { FC, Suspense } from 'react'

import styles from './menu.module.css'
import { Loading } from '../loading/loading'
import Link from 'next/link';

type MenuProps = {
    children: React.ReactNode;
}

export const Menu: FC<MenuProps> = ({ children }) => (
    <div className={styles.wrapper}>
        <aside className={styles.menu}>
            <nav>
                <ul>
                    <li>
                    <Link href="/dashboard">Início</Link>
                    </li>
                    <li>
                    <Link href="/dashboard/tasks">Tarefas</Link>
                    </li>
                    <li>
                    <Link href="/logout">Sair</Link>
                    </li>
                </ul>
            </nav>
        </aside>
        <main className='container'>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </main>
    </div>
  )
