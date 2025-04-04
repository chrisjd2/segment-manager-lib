<template>
    <div class="rating-card">
        <div class="header">
            <h2 class="title"><span class="pb-2">{{ ratingData.title }}</span></h2>
        </div>
        <div class="content-wrapper">
            <div class="content">
                <div class="publishers">
                    <div v-for="(rating) in ratingData.items" :key="rating.name">
                        <div
                            class="publisher-item">
                            {{ rating.name }}
                        </div>
                        <div class="ratings">
                            <div class="rating">
                                <span v-for="(n, i) in rating.score" :key="`filled-${i}`" class="dot filled"></span>
                                <span v-for="(n, i) in rating.maxScore - rating.score" :key="`empty-${i}`" class="dot"></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="logo-wrapper">
                <img src="https://storage.googleapis.com/segments-manager/images/Asset%201.png" alt="logo" width="100" />
            </div>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        ratingData: {
            type: Object,
            required: true,
        },
    });

</script>

<style lang="scss" scoped>
.rating-card {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.branding {
  font-size: 14px;
  color: #888;
  font-weight: bold;
}

.highlight {
  color: #0057ff;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.content {
  margin-top: 16px;
}

.publishers {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.publisher-item {
  padding: 8px 14px;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}

.publisher-item.active {
  background: #2a5ada;
  color: white;
  border-color: #2a5ada;
}

.ratings {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
  padding-left: 14px;
}

.rating {
  display: flex;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ccc;
}

.dot.filled {
  background: #2a5ada;
}

.logo-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;

}
</style>
