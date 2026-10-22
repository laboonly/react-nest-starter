import { useEffect, useState } from 'react';

type HealthResponse = {
  status: string;
  timestamp: string;
};

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/health')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }
        return response.json() as Promise<HealthResponse>;
      })
      .then((data) => {
        if (!cancelled) {
          setHealth(data);
        }
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Unable to connect to API',
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">FULL-STACK STARTER</p>
        <h1>React + NestJS</h1>
        <p className="intro">
          一个可以逐步扩展成真实产品的全栈起点。
        </p>

        <div className="status">
          <span className={`dot ${health ? 'online' : error ? 'offline' : ''}`} />
          <div>
            <strong>API 状态</strong>
            <p>
              {health
                ? `已连接，${new Date(health.timestamp).toLocaleString()}`
                : error ?? '正在连接 NestJS...'}
            </p>
          </div>
        </div>

        <div className="stack">
          <span>React</span>
          <span>Vite</span>
          <span>NestJS</span>
          <span>Prisma</span>
          <span>MySQL</span>
          <span>Zod</span>
        </div>
      </section>
    </main>
  );
}

export default App;
