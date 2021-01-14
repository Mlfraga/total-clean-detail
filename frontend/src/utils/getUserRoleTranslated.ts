export default function getUserRoleTranslated(role: string): string {
  switch (role) {
    case 'SELLER':
      return 'Vendedor';
    case 'MANAGER':
      return 'Gerente';
    case 'ADMIN':
      return 'Administrador';
    default:
      return 'Outracoisa';
  }
}
