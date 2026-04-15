import { motion, AnimatePresence } from 'framer-motion';
import type { OverlayState } from '../../types/game';

interface AnnouncementOverlayProps {
  overlay?: OverlayState;
}

const themeClassMap: Record<OverlayState['theme'], string> = {
  normal: 'theme-normal',
  warning: 'theme-warning',
  boss: 'theme-boss',
  truth: 'theme-truth',
  glitch: 'theme-glitch',
  pressure: 'theme-pressure',
  danger: 'theme-danger',
};

// 判断是否为高强度威压主题
const isIntenseTheme = (theme: OverlayState['theme']): boolean => {
  return ['pressure', 'danger', 'glitch'].includes(theme);
};

export function AnnouncementOverlay({ overlay }: AnnouncementOverlayProps) {
  if (!overlay) return null;

  const intense = isIntenseTheme(overlay.theme);

  return (
    <AnimatePresence>
      {overlay && (
        <motion.div
          key={overlay.key}
          className={`announcement-overlay ${themeClassMap[overlay.theme]} ${intense ? 'intense-mode' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: intense ? 0.08 : 0.18 }}
        >
          {/* 威压背景闪烁层 */}
          {intense && (
            <motion.div
              className="pressure-flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0, 0.5, 0, 0.2, 0] }}
              transition={{ duration: 0.6, repeat: 2 }}
            />
          )}

          {/* 暗角效果 - 威压模式下更深 */}
          <div className={`announcement-vignette ${intense ? 'vignette-intense' : ''}`} />

          {/* 扫描线效果 - 仅威压模式 */}
          {intense && <div className="scanlines" />}

          <motion.div
            className="announcement-copy"
            initial={{ opacity: 0, scale: intense ? 0.7 : 0.92, y: intense ? 50 : 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: intense ? 1.2 : 1.04, y: intense ? -30 : -8, filter: 'blur(6px)' }}
            transition={{ duration: intense ? 0.15 : 0.26, ease: intense ? 'easeOut' : 'easeInOut' }}
          >
            {overlay.kicker && (
              <motion.span
                className="announcement-kicker"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: intense ? 0.05 : 0.1 }}
              >
                {overlay.kicker}
              </motion.span>
            )}

            <motion.h2
              className={`announcement-title ${intense ? 'title-intense' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={intense ? {
                opacity: 1,
                scale: [1, 1.05, 1, 1.02, 1],
                x: [0, -3, 3, -2, 2, 0],
                y: [0, 2, -2, 1, -1, 0],
              } : {
                opacity: 1,
                x: [0, -1.5, 1.5, 0],
                y: [0, 1, -1, 0],
              }}
              transition={intense ? {
                duration: 0.4,
                repeat: 3,
                repeatType: 'reverse',
              } : {
                duration: 0.22,
                repeat: 4,
                repeatType: 'mirror',
              }}
            >
              {overlay.title}
            </motion.h2>

            {overlay.subtitle && (
              <motion.p
                className="announcement-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: intense ? 0.1 : 0.15 }}
              >
                {overlay.subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* 边缘警告条 - 仅威压模式 */}
          {intense && (
            <>
              <motion.div
                className="warning-bar top"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 0.8, 1] }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="warning-bar bottom"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 0.8, 1] }}
                transition={{ duration: 0.3, delay: 0.05 }}
              />
              <motion.div
                className="warning-bar left"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: [0, 1, 0.8, 1] }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              <motion.div
                className="warning-bar right"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: [0, 1, 0.8, 1] }}
                transition={{ duration: 0.3, delay: 0.15 }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
