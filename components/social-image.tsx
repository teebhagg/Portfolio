export default function SocialImage() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '70px 82px',
        color: '#f8f8f7',
        background:
          'radial-gradient(circle at 82% 22%, #383a3c 0%, transparent 34%), linear-gradient(135deg, #111213 0%, #202224 100%)',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: '#deded9'
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 5,
            color: '#c7c7c3',
            textTransform: 'uppercase'
          }}
        >
          Joshua Ansah · Portfolio
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.04,
            fontWeight: 700,
            letterSpacing: -3
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            maxWidth: 820,
            fontSize: 30,
            lineHeight: 1.35,
            color: '#c5c6c3'
          }}
        >
          Building thoughtful web, mobile, and product experiences.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {['React', 'TypeScript', 'Node.js', 'Flutter'].map((skill) => (
          <div
            key={skill}
            style={{
              display: 'flex',
              padding: '12px 20px',
              border: '1px solid #5e6061',
              borderRadius: 999,
              fontSize: 20,
              color: '#e0e0dc'
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
