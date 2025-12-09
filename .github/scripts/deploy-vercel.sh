#!/bin/bash

set -e

DEPLOY_TYPE=$1 # 'preview' or 'production'

if [ -z "$VERCEL_PROJECT_ID" ]; then
  echo "🔍 VERCEL_PROJECT_ID is not set. Using Vercel CLI to link project..."
  # Try to link to existing project or create new one using Vercel CLI
  echo "🔗 Linking to Vercel project..."

  # Create a temporary vercel.json for project configuration
  cat > vercel.json << EOF
{
  "name": "$VERCEL_PROJECT_NAME",
  "buildCommand": "$VERCEL_BUILD_COMMAND",
  "outputDirectory": "$VERCEL_OUTPUT_DIR",
  "framework": "$VERCEL_FRAMEWORK"
}
EOF

  # Use Vercel CLI to link/create project
  if vercel link --confirm --token "$VERCEL_TOKEN" <<< "n"; then
    echo "✅ Successfully linked to Vercel project"
    # Get the project ID from the linked configuration (simple parsing without jq)
    if [ -f .vercel/project.json ]; then
      export VERCEL_PROJECT_ID=$(grep -o '"projectId":"[^"]*"' .vercel/project.json | cut -d'"' -f4 || echo "")
    fi
  else
    echo "⚠️  Could not link to project, will attempt deployment anyway"
  fi

  # Clean up temporary vercel.json
  rm -f vercel.json
else
  echo "🔑 Using predefined VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
fi

# Set environment variables for Vercel
echo "🔧 Setting environment variables for Vercel..."

# List of environment variables to set
ENV_VARS=(
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "DATABASE_URL"
  "REDIS_URL"
  "WEBHOOK_SECRET"
  "SUPABASE_STORAGE_URL"
)

# Set environment variables using Vercel CLI
for var in "${ENV_VARS[@]}"; do
  if [ -n "${!var}" ]; then
    echo "📝 Setting $var..."
    # First try to remove the variable if it exists
    vercel env rm "$var" --token "$VERCEL_TOKEN" --scope "$([ "$DEPLOY_TYPE" = "production" ] && echo "production" || echo "preview")" 2>/dev/null || true
    sleep 1  # Give Vercel API time to process the removal
    # Try to add the variable, if it fails, try to update it instead
    if ! vercel env add "$var" "$([ "$DEPLOY_TYPE" = "production" ] && echo "production" || echo "preview")" --token "$VERCEL_TOKEN" <<< "${!var}"; then
      echo "⚠️  Failed to add $var, trying to remove with different scope and add again..."
      # Try removing from both scopes to ensure clean state
      vercel env rm "$var" --token "$VERCEL_TOKEN" --scope "production" 2>/dev/null || true
      vercel env rm "$var" --token "$VERCEL_TOKEN" --scope "preview" 2>/dev/null || true
      sleep 2  # Give more time for API to process
      # Try adding again
      if ! vercel env add "$var" "$([ "$DEPLOY_TYPE" = "production" ] && echo "production" || echo "preview")" --token "$VERCEL_TOKEN" <<< "${!var}"; then
        echo "⚠️  Warning: Failed to set $var environment variable after multiple attempts"
      else
        echo "✅ Successfully set $var environment variable (second attempt)"
      fi
    else
      echo "✅ Successfully set $var environment variable"
    fi
  else
    echo "⚠️  Warning: $var is not set"
  fi
done

# Install dependencies and remove .git directory to optimize deployment
echo "📦 Installing dependencies..."
if ! pnpm install --frozen-lockfile --prod=false; then
  echo "❌ Failed to install dependencies"
  exit 1
fi
echo "✅ Dependencies installed successfully"

echo "🗑️  Removing Git history to optimize deployment..."
rm -rf .git
echo "✅ Git history removed successfully"

# Remove build artifacts to reduce upload size
echo "🗑️  Removing build artifacts to reduce upload size..."
rm -rf .next dist
echo "✅ Build artifacts removed successfully"

# Set up Vercel configuration for deployment
export VERCEL_ORG_ID=$VERCEL_ORG_ID
if [ -n "$VERCEL_PROJECT_ID" ]; then
  export VERCEL_PROJECT_ID=$VERCEL_PROJECT_ID
fi

# Now perform the deployment with optimized settings
if [ "$DEPLOY_TYPE" == "preview" ]; then
  echo "🚀 Deploying to Vercel Preview..."
  if ! DEPLOY_OUTPUT=$(vercel --token $VERCEL_TOKEN --yes --archive=tgz); then
    echo "❌ Vercel preview deployment failed."
    exit 1
  fi
  echo "$DEPLOY_OUTPUT"
  PREVIEW_URL=$(echo "$DEPLOY_OUTPUT" | grep -E "(https://[^[:space:]]+vercel\.app|https://[^[:space:]]+vercel\.sh)" | tail -n 1)
  echo "🚀 Deployed to Vercel Preview successfully ✅!"
  echo "✨ Preview URL: $PREVIEW_URL"
elif [ "$DEPLOY_TYPE" == "production" ]; then
  echo "🚀 Deploying to Vercel Production..."
  if ! vercel --prod --token $VERCEL_TOKEN --yes --archive=tgz; then
    echo "❌ Vercel production deployment failed."
    exit 1
  fi
  echo "🚀 Deployed to Vercel successfully ✅!"
  echo "✨ Production URL: https://$VERCEL_PROJECT_NAME.vercel.app"
else
  echo "❌ Invalid deployment type specified: $DEPLOY_TYPE. Must be 'preview' or 'production'."
  exit 1
fi
