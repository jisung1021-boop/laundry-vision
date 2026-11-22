import React from 'react';

/**
 * High-quality SVG Laundry Care Symbols (KS K 0021 & ISO 3758)
 */
export default function LaundryIcon({ code, className = "w-10 h-10", size = 48, color = "currentColor" }) {
  const normCode = (code || '').toUpperCase();

  // 1. 물세탁 (WASH)
  if (normCode.includes('WASH_95')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 20 L13 38 C13.5 40 15 41 17 41 L31 41 C33 41 34.5 40 35 38 L40 20 Z" />
        <path d="M8 22 Q16 18 24 22 T40 22" strokeWidth="2" />
        <text x="24" y="34" fontSize="10" fontWeight="bold" stroke="none" fill={color} textAnchor="middle" fontFamily="sans-serif">95°</text>
      </svg>
    );
  }

  if (normCode.includes('WASH_60')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 20 L13 38 C13.5 40 15 41 17 41 L31 41 C33 41 34.5 40 35 38 L40 20 Z" />
        <path d="M8 22 Q16 18 24 22 T40 22" strokeWidth="2" />
        <text x="24" y="34" fontSize="10" fontWeight="bold" stroke="none" fill={color} textAnchor="middle" fontFamily="sans-serif">60°</text>
      </svg>
    );
  }

  if (normCode.includes('WASH_40_GENTLE') || normCode.includes('WASH_GENTLE')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 18 L13 36 C13.5 38 15 39 17 39 L31 39 C33 39 34.5 38 35 36 L40 18 Z" />
        <path d="M8 20 Q16 16 24 20 T40 20" strokeWidth="2" />
        <text x="24" y="32" fontSize="9" fontWeight="bold" stroke="none" fill={color} textAnchor="middle" fontFamily="sans-serif">40°</text>
        <line x1="12" y1="43" x2="36" y2="43" strokeWidth="2.5" />
      </svg>
    );
  }

  if (normCode.includes('WASH_30_VERY_GENTLE') || normCode.includes('WASH_30')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 16 L13 34 C13.5 36 15 37 17 37 L31 37 C33 37 34.5 36 35 34 L40 16 Z" />
        <path d="M8 18 Q16 14 24 18 T40 18" strokeWidth="2" />
        <text x="24" y="30" fontSize="9" fontWeight="bold" stroke="none" fill={color} textAnchor="middle" fontFamily="sans-serif">30°</text>
        <line x1="12" y1="41" x2="36" y2="41" strokeWidth="2" />
        <line x1="12" y1="44" x2="36" y2="44" strokeWidth="2" />
      </svg>
    );
  }

  if (normCode.includes('WASH_HAND') || normCode.includes('HAND')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 22 L13 38 C13.5 40 15 41 17 41 L31 41 C33 41 34.5 40 35 38 L40 22 Z" />
        <path d="M8 24 Q16 20 24 24 T40 24" strokeWidth="2" />
        {/* Hand dipping */}
        <path d="M21 11 L21 21 M24 9 L24 21 M27 11 L27 21 M30 14 L30 21" strokeWidth="2" />
        <path d="M18 17 L18 22 C18 25 21 28 25 28 L31 28" strokeWidth="2" />
      </svg>
    );
  }

  if (normCode.includes('WASH_NO') || normCode.includes('WASH_PROHIBITED')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 20 L13 38 C13.5 40 15 41 17 41 L31 41 C33 41 34.5 40 35 38 L40 20 Z" />
        <path d="M8 22 Q16 18 24 22 T40 22" strokeWidth="2" />
        <line x1="10" y1="14" x2="38" y2="42" stroke="#EF4444" strokeWidth="3" />
        <line x1="38" y1="14" x2="10" y2="42" stroke="#EF4444" strokeWidth="3" />
      </svg>
    );
  }

  if (normCode.includes('WASH')) {
    // General Tub 40°
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 20 L13 38 C13.5 40 15 41 17 41 L31 41 C33 41 34.5 40 35 38 L40 20 Z" />
        <path d="M8 22 Q16 18 24 22 T40 22" strokeWidth="2" />
        <text x="24" y="34" fontSize="10" fontWeight="bold" stroke="none" fill={color} textAnchor="middle" fontFamily="sans-serif">40°</text>
      </svg>
    );
  }

  // 2. 표백 (BLEACH)
  if (normCode.includes('BLEACH_OXYGEN') || normCode.includes('OXYGEN')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="24,9 9,39 39,39" strokeWidth="2.5" />
        <line x1="19" y1="37" x2="27" y2="21" strokeWidth="2" />
        <line x1="25" y1="37" x2="33" y2="21" strokeWidth="2" />
      </svg>
    );
  }

  if (normCode.includes('BLEACH_NO') || normCode.includes('BLEACH_PROHIBITED')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="24,9 9,39 39,39" strokeWidth="2.5" />
        <line x1="12" y1="18" x2="36" y2="38" stroke="#EF4444" strokeWidth="3" />
        <line x1="36" y1="18" x2="12" y2="38" stroke="#EF4444" strokeWidth="3" />
      </svg>
    );
  }

  if (normCode.includes('BLEACH')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="24,9 9,39 39,39" strokeWidth="2.5" />
      </svg>
    );
  }

  // 3. 건조 (DRY)
  if (normCode.includes('TUMBLE_HIGH') || normCode.includes('DRY_HIGH')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="9" y="9" width="30" height="30" rx="3" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="11" strokeWidth="2" />
        <circle cx="20" cy="24" r="2" fill={color} stroke="none" />
        <circle cx="28" cy="24" r="2" fill={color} stroke="none" />
      </svg>
    );
  }

  if (normCode.includes('TUMBLE_LOW') || normCode.includes('DRY_LOW')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="9" y="9" width="30" height="30" rx="3" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="11" strokeWidth="2" />
        <circle cx="24" cy="24" r="2.5" fill={color} stroke="none" />
      </svg>
    );
  }

  if (normCode.includes('TUMBLE_NO') || normCode.includes('DRY_NO') || normCode.includes('TUMBLE_PROHIBITED')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="9" y="9" width="30" height="30" rx="3" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="11" strokeWidth="2" />
        <line x1="10" y1="10" x2="38" y2="38" stroke="#EF4444" strokeWidth="3" />
        <line x1="38" y1="10" x2="10" y2="38" stroke="#EF4444" strokeWidth="3" />
      </svg>
    );
  }

  if (normCode.includes('DRY_FLAT_SHADE') || normCode.includes('FLAT')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="9" y="9" width="30" height="30" rx="3" strokeWidth="2.5" />
        <line x1="9" y1="18" x2="18" y2="9" strokeWidth="2" />
        <line x1="9" y1="24" x2="24" y2="9" strokeWidth="2" />
        <line x1="15" y1="26" x2="33" y2="26" strokeWidth="3" />
      </svg>
    );
  }

  if (normCode.includes('DRY_LINE_SHADE') || normCode.includes('SHADE')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="9" y="9" width="30" height="30" rx="3" strokeWidth="2.5" />
        <line x1="9" y1="18" x2="18" y2="9" strokeWidth="2" />
        <line x1="9" y1="24" x2="24" y2="9" strokeWidth="2" />
        <path d="M12 15 Q24 22 36 15" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  if (normCode.includes('WRING_NO')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 24 C14 20 18 18 24 24 C30 30 34 28 36 24" strokeWidth="2.5" />
        <line x1="12" y1="12" x2="36" y2="36" stroke="#EF4444" strokeWidth="3" />
        <line x1="36" y1="12" x2="12" y2="36" stroke="#EF4444" strokeWidth="3" />
      </svg>
    );
  }

  if (normCode.includes('DRY') || normCode.includes('TUMBLE')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="9" y="9" width="30" height="30" rx="3" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="11" strokeWidth="2" />
      </svg>
    );
  }

  // 4. 다림질 (IRON)
  if (normCode.includes('IRON_200') || normCode.includes('IRON_HIGH')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 34 L38 34 C38 34 36 22 28 22 L18 22 C12 22 10 28 10 34 Z M18 22 L18 16 L28 16" strokeWidth="2.5" />
        <circle cx="18" cy="29" r="1.5" fill={color} stroke="none" />
        <circle cx="24" cy="29" r="1.5" fill={color} stroke="none" />
        <circle cx="30" cy="29" r="1.5" fill={color} stroke="none" />
      </svg>
    );
  }

  if (normCode.includes('IRON_150') || normCode.includes('IRON_MEDIUM')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 34 L38 34 C38 34 36 22 28 22 L18 22 C12 22 10 28 10 34 Z M18 22 L18 16 L28 16" strokeWidth="2.5" />
        <circle cx="21" cy="29" r="1.5" fill={color} stroke="none" />
        <circle cx="27" cy="29" r="1.5" fill={color} stroke="none" />
      </svg>
    );
  }

  if (normCode.includes('IRON_CLOTH') || normCode.includes('CLOTH')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 36 L38 36 C38 36 36 24 28 24 L18 24 C12 24 10 30 10 36 Z M18 24 L18 18 L28 18" strokeWidth="2.5" />
        {/* Cloth wave above */}
        <path d="M10 12 Q24 8 38 12" stroke="#0284C7" strokeWidth="2.5" />
      </svg>
    );
  }

  if (normCode.includes('IRON_NO') || normCode.includes('IRON_PROHIBITED')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 34 L38 34 C38 34 36 22 28 22 L18 22 C12 22 10 28 10 34 Z M18 22 L18 16 L28 16" strokeWidth="2.5" />
        <line x1="12" y1="14" x2="36" y2="38" stroke="#EF4444" strokeWidth="3" />
        <line x1="36" y1="14" x2="12" y2="38" stroke="#EF4444" strokeWidth="3" />
      </svg>
    );
  }

  if (normCode.includes('IRON_110') || normCode.includes('IRON_LOW') || normCode.includes('IRON')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 34 L38 34 C38 34 36 22 28 22 L18 22 C12 22 10 28 10 34 Z M18 22 L18 16 L28 16" strokeWidth="2.5" />
        <circle cx="24" cy="29" r="1.5" fill={color} stroke="none" />
      </svg>
    );
  }

  // 5. 드라이클리닝 (DRYCLEAN)
  if (normCode.includes('DRYCLEAN_P')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="24" cy="24" r="15" strokeWidth="2.5" />
        <text x="24" y="30" fontSize="17" fontWeight="bold" stroke="none" fill={color} textAnchor="middle" fontFamily="'Pretendard', sans-serif">P</text>
      </svg>
    );
  }

  if (normCode.includes('DRYCLEAN_F')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="24" cy="24" r="15" strokeWidth="2.5" />
        <text x="24" y="30" fontSize="17" fontWeight="bold" stroke="none" fill={color} textAnchor="middle" fontFamily="'Pretendard', sans-serif">F</text>
      </svg>
    );
  }

  if (normCode.includes('WETCLEAN_W') || normCode.includes('CLEAN_W')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="24" cy="24" r="15" strokeWidth="2.5" />
        <text x="24" y="30" fontSize="16" fontWeight="bold" stroke="none" fill={color} textAnchor="middle" fontFamily="'Pretendard', sans-serif">W</text>
      </svg>
    );
  }

  if (normCode.includes('DRYCLEAN_NO') || normCode.includes('DRYCLEAN_PROHIBITED')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="24" cy="24" r="15" strokeWidth="2.5" />
        <line x1="13" y1="13" x2="35" y2="35" stroke="#EF4444" strokeWidth="3" />
        <line x1="35" y1="13" x2="13" y2="35" stroke="#EF4444" strokeWidth="3" />
      </svg>
    );
  }

  if (normCode.includes('DRYCLEAN')) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="24" cy="24" r="15" strokeWidth="2.5" />
      </svg>
    );
  }

  // Default / Unclear
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="24" cy="24" r="15" strokeDasharray="4 4" strokeWidth="2" />
      <text x="24" y="30" fontSize="16" fontWeight="bold" stroke="none" fill={color} textAnchor="middle">?</text>
    </svg>
  );
}
