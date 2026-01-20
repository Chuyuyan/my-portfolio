export default async function DemoLoadingPage() {
    // 故意等 4 秒，保证能看到动画
    await new Promise((r) => setTimeout(r, 16000));
    return <div className="p-10 text-white">Demo loaded.</div>;
  }
  