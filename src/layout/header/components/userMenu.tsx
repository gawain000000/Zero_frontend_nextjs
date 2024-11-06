import type { MenuProps } from 'antd'
import { Avatar, Dropdown } from 'antd'

import { useTranslation } from 'react-i18next'
import { useUserStore } from '#src/store'

export default function UserMenu() {
  const avatar = useUserStore(state => state.avatar)
  const logout = useUserStore(state => state.logout)
  const { t } = useTranslation()

  const items: MenuProps['items'] = [
    {
      label: t('menu.logout'),
      key: 'logout',
    },
  ]

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === 'logout') {
      await logout()
    }
  }

  return (
    <Dropdown menu={{ items, onClick }} arrow placement="bottom">
      <div role="menuitem" tabIndex={-1}>
        <Avatar src={avatar} />
      </div>
    </Dropdown>
  )
}
