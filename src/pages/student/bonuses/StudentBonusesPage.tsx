import {
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useStudentBonusesPage } from '@/entities/student-bonus'
import { PageHeader } from '@/shared/ui'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { ru } from '@/shared/i18n/ru'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('ru-RU')
}

export function StudentBonusesPage() {
  const { data, isLoading, isError, refetch } = useStudentBonusesPage()

  if (isLoading) {
    return (
      <>
        <PageHeader title={ru.nav.bonuses} />
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={88} />
          <Skeleton variant="rounded" height={240} />
        </Stack>
      </>
    )
  }

  if (isError || !data) {
    return (
      <>
        <PageHeader title={ru.nav.bonuses} />
        <LoadErrorState onRetry={() => void refetch()} />
      </>
    )
  }

  return (
    <>
      <PageHeader title={ru.nav.bonuses} />
      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography color="text.secondary" variant="body2">
          {ru.profile.statsBonuses}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
          {data.balance}
        </Typography>
        {data.activeDiscountPercent > 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Скидка: {data.activeDiscountPercent}%
          </Typography>
        ) : null}
      </Paper>
      <Typography variant="h6" sx={{ mb: 2 }}>
        История операций
      </Typography>
      {data.transactions.length === 0 ? (
        <Typography color="text.secondary">Операций пока нет</Typography>
      ) : (
        <Paper variant="outlined" sx={{ overflow: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell align="right">Сумма</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{formatDate(tx.createdAt)}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell align="right">{tx.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </>
  )
}
