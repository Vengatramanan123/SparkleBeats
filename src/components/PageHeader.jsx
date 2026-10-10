import React from 'react';

export default function PageHeader({
  tag = '',
  title = '',
  outlineWord = '',
  description = '',
  badge = null,
  align = 'left'
}) {
  return (
    <div 
      className="page-header"
      style={{
        paddingTop: 'var(--space-12)',
        paddingBottom: 'var(--space-8)',
        textAlign: align,
        maxWidth: align === 'center' ? '800px' : '960px',
        margin: align === 'center' ? '0 auto var(--space-8)' : '0 0 var(--space-8)'
      }}
    >
      {/* Category / Badge Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-3)', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        {tag && (
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-accent-lime)'
          }}>
            // {tag}
          </span>
        )}
        {badge && (
          <span className={`sticker-badge sticker-${badge.type || 'purple'}`}>
            {badge.text}
          </span>
        )}
      </div>

      {/* Oversized Headline */}
      <h1 style={{
        lineHeight: 1.05,
        marginBottom: 'var(--space-4)',
        letterSpacing: '-0.03em'
      }}>
        {title}{' '}
        {outlineWord && (
          <span className="text-stroke-lime" style={{ display: 'inline' }}>
            {outlineWord}
          </span>
        )}
      </h1>

      {/* Lead Description */}
      {description && (
        <p style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-text-secondary)',
          maxWidth: '680px',
          lineHeight: 1.6,
          margin: align === 'center' ? '0 auto' : '0'
        }}>
          {description}
        </p>
      )}
    </div>
  );
}
