import MigrationWizard from '@/components/migration/MigrationWizard';

export default function MigrationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Data Migration</h1>
      </div>

      <MigrationWizard />
    </div>
  );
}
