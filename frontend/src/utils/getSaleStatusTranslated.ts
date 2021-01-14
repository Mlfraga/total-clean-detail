export default function getSaleStatusTranslated(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'Pendente';
    case 'CANCELED':
      return 'Cancelado';
    case 'CONFIRMED':
      return 'Confirmado';
    case 'FINISHED':
      return 'Finalizado';
    default:
      return 'Outracoisa';
  }
}
