export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">今月の売上</h3>
          <p className="text-3xl font-bold text-gray-900">¥0</p>
          <p className="text-sm text-gray-500 mt-2">前月比 -</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">今月の経費</h3>
          <p className="text-3xl font-bold text-gray-900">¥0</p>
          <p className="text-sm text-gray-500 mt-2">前月比 -</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">今月の利益</h3>
          <p className="text-3xl font-bold text-green-600">¥0</p>
          <p className="text-sm text-gray-500 mt-2">前月比 -</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">未回収金額</h3>
          <p className="text-3xl font-bold text-orange-600">¥0</p>
          <p className="text-sm text-gray-500 mt-2">請求済み未入金</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">最近の請求書</h2>
          <p className="text-gray-500">データがありません</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">最近の経費</h2>
          <p className="text-gray-500">データがありません</p>
        </div>
      </div>
    </div>
  );
}
