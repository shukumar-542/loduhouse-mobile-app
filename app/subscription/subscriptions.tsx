import React from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import RecallProLogo from "@/assets/images/SplashIcon.svg";
import SvgIcon from "@/components/shared/svgIcon";
import { GeneralText } from "@/components/shared/GeneralText";
import TrialBanner from "../../components/subscription/TrialBanner";
import { SubscriptionButton } from "../../components/subscription/SubscriptionButton";
import PlanSelector from "../../components/subscription/PlanSelector";
const Subscriptions = () => {
  const { width } = Dimensions.get("window");

  const handleSubscription = () => {
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0F0B18" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 24,
              paddingTop: 32,
              paddingBottom: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#C9A367",
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 16,
              }}
            >
              Choose Your Plan
            </Text>
            <SvgIcon SvgComponent={RecallProLogo} width={width * 0.5} />
            <GeneralText
              title="Unlock Exiting Features"
              description="Unlimited visits, clients, and media uploads to master your craft"
            />
            <TrialBanner to="/tabs/home" />
            <PlanSelector />
            <SubscriptionButton
              label="Subscribe via Stripe"
              onPress={handleSubscription}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Subscriptions;
