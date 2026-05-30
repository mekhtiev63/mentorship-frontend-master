import { StubPage } from '@/pages/_shared/StubPage'
import { ru } from '@/shared/i18n/ru'

export function NotFoundPage() {
  return (
    <StubPage title={ru.stub.pageNotFound} description={ru.stub.pageNotFoundDescription} />
  )
}
