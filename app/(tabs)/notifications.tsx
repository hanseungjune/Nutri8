import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { Theme } from '../../constants/theme';
import {
  requestNotificationPermissions,
  loadNotificationSettings,
  saveNotificationSettings,
  initializeNotifications,
  type NotificationSettings,
} from '../../utils/notificationUtils';
import { Card } from '../../components/common/Card';

export default function NotificationsScreen() {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    breakfast: { enabled: false, time: '08:00' },
    lunch: { enabled: false, time: '12:00' },
    dinner: { enabled: false, time: '18:00' },
    snack: { enabled: false, time: '15:00' },
  });
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const saved = await loadNotificationSettings();
    setSettings(saved);
    
    if (Platform.OS !== 'web') {
      const permission = await requestNotificationPermissions();
      setHasPermission(permission);
    }
  };

  const handleToggleMain = async (value: boolean) => {
    if (value && !hasPermission && Platform.OS !== 'web') {
      const permission = await requestNotificationPermissions();
      if (!permission) {
        Alert.alert('권한 필요', '알림을 사용하려면 알림 권한이 필요합니다.');
        return;
      }
      setHasPermission(true);
    }

    const newSettings = { ...settings, enabled: value };
    setSettings(newSettings);
    await saveNotificationSettings(newSettings);
    await initializeNotifications(newSettings);
  };

  const handleToggleMeal = async (
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    value: boolean
  ) => {
    const newSettings = {
      ...settings,
      [mealType]: { ...settings[mealType], enabled: value },
    };
    setSettings(newSettings);
    await saveNotificationSettings(newSettings);
    if (settings.enabled) {
      await initializeNotifications(newSettings);
    }
  };

  const handleChangeTime = (
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    time: string
  ) => {
    Alert.prompt(
      '시간 설정',
      `${mealTypeLabels[mealType]} 알림 시간을 입력하세요 (HH:MM)`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '저장',
          onPress: async (newTime?: string) => {
            if (!newTime) return;
            
            // 시간 형식 검증
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(newTime)) {
              Alert.alert('오류', '올바른 시간 형식을 입력하세요 (예: 08:00)');
              return;
            }

            const newSettings = {
              ...settings,
              [mealType]: { ...settings[mealType], time: newTime },
            };
            setSettings(newSettings);
            await saveNotificationSettings(newSettings);
            if (settings.enabled) {
              await initializeNotifications(newSettings);
            }
          },
        },
      ],
      'plain-text',
      time
    );
  };

  const mealTypeLabels = {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁',
    snack: '간식',
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>알림 설정</Text>
          <Card>
            <Text style={styles.webNotice}>
              ⚠️ 웹 버전에서는 알림 기능을 사용할 수 없습니다.
            </Text>
            <Text style={styles.webNoticeSubtext}>
              모바일 앱에서 사용해주세요.
            </Text>
          </Card>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>알림 설정</Text>

        {/* 메인 토글 */}
        <Card style={styles.mainCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>알림 사용</Text>
              <Text style={styles.settingDescription}>
                식사 시간 알림을 받습니다
              </Text>
            </View>
            <Switch
              value={settings.enabled}
              onValueChange={handleToggleMain}
              trackColor={{ false: '#ccc', true: Theme.colors.primaryLight }}
              thumbColor={settings.enabled ? Theme.colors.primary : '#f4f3f4'}
            />
          </View>
        </Card>

        {/* 식사별 설정 */}
        {settings.enabled && (
          <>
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((mealType) => (
              <Card key={mealType} style={styles.mealCard}>
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.mealTitle}>
                      {mealTypeLabels[mealType]} 🍽️
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleChangeTime(mealType, settings[mealType].time)}
                    >
                      <Text style={styles.timeText}>
                        {settings[mealType].time} (탭하여 변경)
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Switch
                    value={settings[mealType].enabled}
                    onValueChange={(value) => handleToggleMeal(mealType, value)}
                    trackColor={{ false: '#ccc', true: Theme.colors.primaryLight }}
                    thumbColor={settings[mealType].enabled ? Theme.colors.primary : '#f4f3f4'}
                  />
                </View>
              </Card>
            ))}
          </>
        )}

        {/* 안내 */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 알림은 매일 설정한 시간에 반복됩니다.
          </Text>
          <Text style={styles.infoText}>
            💡 시간을 탭하여 변경할 수 있습니다.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xl,
  },
  mainCard: {
    marginBottom: Theme.spacing.md,
  },
  mealCard: {
    marginBottom: Theme.spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  settingDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
  },
  mealTitle: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  timeText: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
  infoBox: {
    backgroundColor: Theme.colors.primaryBg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.base,
    marginTop: Theme.spacing.xl,
  },
  infoText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.xs,
  },
  webNotice: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.warning,
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
  },
  webNoticeSubtext: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
  },
});
