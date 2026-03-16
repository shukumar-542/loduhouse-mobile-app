import React, { useState, useEffect, useRef } from "react";
import { View, Animated, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingIllustration from "@/components/onboarding/OnboardingIllustration";
import { OnboardingText } from "@/components/onboarding/OnboardingText";
import { PaginationDots } from "@/components/onboarding/PaginationDots";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { ONBOARDING_DATA } from "@/constants/onboarding";
import { router } from "expo-router";
import onboarding1 from "@/assets/images/Loog.png"


const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const totalSteps = ONBOARDING_DATA.length;
  const content = ONBOARDING_DATA[currentStep];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    scaleAnim.setValue(0.95);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 9,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  const handleNext = (): void => {
    // if (currentStep < totalSteps - 1) {
    //   setCurrentStep((prev) => prev + 1);
    // } else {
      router.replace("/auth/login");
    // }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0B18]">
      <Animated.View
        style={{
          flex: 3,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
        className="items-center justify-end w-full pb-4"
      >
        {/* <OnboardingIllustration imageSrc={onboarding1} /> */}
          <Image
            source={onboarding1}
            style={{
              width: "80%",
              // height: "30%",
            }}
            resizeMode="contain"
          />

        <View className="items-center px-8">
          <Text className="text-white text-2xl font-semibold text-center ">Premium Studio Management</Text>

        </View>
      </Animated.View>

      <Animated.View
        style={{
          flex: 2,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="px-8 justify-between pb-12"
      >
        {/* <View className="items-center">
          <OnboardingText
            title={content.title}
            description={content.description}
          />
        </View> */}

        <View className="w-full gap-y-8">
          {/* <View className="py-4">
            <PaginationDots total={totalSteps} activeIndex={currentStep} />
          </View> */}
          <PrimaryButton
            label={"Get Started"}
            onPress={handleNext}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
